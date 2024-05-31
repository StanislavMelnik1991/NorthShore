import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, ILoginResponse } from '@entities/types';
import { TOKEN_LOCAL_STORAGE_KEY } from '@shared/constants';
import { useUser } from './useUser';

export const useLogin = () => {
  const { setUser } = useUser();
  const { t, i18n } = useTranslation('auth');

  const schema = z.object({
    account_number: z
      .string({ required_error: t('errors.required') })
      .min(1, t('errors.required')),
    password: z
      .string({ required_error: t('errors.required') })
      .min(1, t('errors.required')),
  });

  type ValuesType = z.infer<typeof schema>;

  const validate = useCallback(
    (data: unknown) => {
      const res = schema.safeParse(data) as SafeParseError<ValuesType>;
      if (res.error) {
        return res.error.formErrors.fieldErrors;
      }
    },
    [schema],
  );

  const login = useCallback(
    async (body: Partial<ValuesType>) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const { data } = await axiosApi.post<BaseResponse<ILoginResponse>>(
          '/auth/login',
          body,
        );
        if (data && data.data && data.data.token) {
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, data.data.token);
          if (data.data.lang) {
            i18n.changeLanguage(data.data.lang);
          }
          setUser?.(data.data);
          toast.success(`${t('toast.loginSuccess')} ${data.data.name}`);
          return data.data;
        } else {
          toast.error(t('toast.loginError'));
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.request.status as number) {
            case 403:
              toast.error(t('toast.incorrect'));
              break;
            default:
              toast.error(t('toast.loginError'));
              break;
          }
        }
      }
    },
    [i18n, setUser, t, validate],
  );

  return {
    login,
    validate,
  };
};
