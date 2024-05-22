import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, ILoginResponse } from '@entities/types';
import { TOKEN_LOCAL_STORAGE_KEY } from '@shared/constants';
import { useUser } from './useUser';

export const useConfirmation = (id: string | number) => {
  const { setUser } = useUser();
  const { t } = useTranslation();

  const schema = z.object({
    phone_code: z
      .string({ required_error: t('errors.required') })
      .min(4, t('errors.required'))
      .max(4, t('errors.required'))
      .refine((value) => /^\d+$/.test(value), {
        message: t('errors.invalidFormat'),
      })
      .optional(),
    email_code: z
      .string({ required_error: t('errors.required') })
      .min(4, t('errors.required'))
      .max(4, t('errors.required'))
      .refine((value) => /^\d+$/.test(value), {
        message: t('errors.invalidFormat'),
      })
      .optional(),
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

  const confirm = useCallback(
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
          '/user/confirmation/process_pack',
          { ...body, user_id: id },
        );
        if (data && data.data && data.data.token) {
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, data.data.token);
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
    [id, setUser, t, validate],
  );

  return {
    confirm,
    validate,
  };
};
