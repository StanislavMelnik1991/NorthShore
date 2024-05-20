import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser } from '@entities/types';
import { PASSWORD_REGEX, PHONE_REGEX } from '@shared/constants';
// import { useUser } from './useUser';

export const useRegistration = () => {
  // const { setUser } = useUser();
  const { t } = useTranslation('auth');

  const schema = z
    .object({
      name: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required')),
      surname: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required')),
      phone_number: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required'))
        .regex(PHONE_REGEX, t('errors.phoneInvalid')),
      email: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required'))
        .email(t('errors.emailInvalid')),
      password: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required'))
        .regex(PASSWORD_REGEX, t('errors.passwordPattern')),
      confirmPassword: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required')),
      account_number: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required')),
      is_accepted: z.boolean({ required_error: t('errors.required') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.passwordMatch'),
      path: ['confirmPassword'],
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

  const signUp = useCallback(
    async (body: Partial<ValuesType>) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const { data } = await axiosApi.put<BaseResponse<IUser>>(
          '/users/register',
          body,
        );
        if (data && data.data && data.data.id) {
          // localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, data.data.token);
          // setUser?.(data.data);
          // toast.success(`${t('toast.loginSuccess')} ${data.data.name}`);
          return data.data;
        } else {
          // toast.error(t('toast.loginError'));
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.request.status as number) {
            case 403:
              toast.error(t('toast.incorrect'));
              break;
            case 404:
              toast.error(t('toast.incorrect'));
              break;
            default:
              toast.error(t('toast.loginError'));
              break;
          }
        }
      }
    },
    [t, validate],
  );

  return {
    signUp,
    validate,
  };
};
