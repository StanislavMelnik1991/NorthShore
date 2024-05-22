import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse } from '@entities/types';
import { PASSWORD_REGEX } from '@shared/constants';

export const useChangePassword = () => {
  const { t } = useTranslation();

  const schema = z
    .object({
      password: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required'))
        .regex(PASSWORD_REGEX, t('errors.passwordPattern')),
      confirmPassword: z
        .string({ required_error: t('errors.required') })
        .min(1, t('errors.required')),
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

  const update = useCallback(
    async (body: Partial<ValuesType>) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const { data } = await axiosApi.post<BaseResponse<{ id: number }>>(
          '/user/password',
          body,
        );
        if (data && data.data) {
          toast.success(`${t('toast.updateSuccess')}`);
          return data.data;
        } else {
          toast.error(t('toast.unforeseen'));
        }
      } catch (error) {
        toast.error(t('toast.unforeseen'));
      }
    },
    [t, validate],
  );

  return {
    update,
    validate,
  };
};
