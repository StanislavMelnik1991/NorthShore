import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse } from '@entities/types';
import { ResendMethodsEnum, ResendReasonsEnum } from '@shared/constants';

export const usePasswordResetRequest = () => {
  const { t } = useTranslation('auth');

  const schema = z.object({
    target: z.string().min(1, t('errors.required')),
    target_method: z.enum(
      Object.values(ResendMethodsEnum) as [string, ...string[]],
      {
        message: t('errors.invalidFormat'),
      },
    ),
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

  const resend = useCallback(
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
          '/user/password_reset/confirmation/send',
          { ...body, reason: ResendReasonsEnum.PasswordReset },
        );
        if (data && data.data) {
          toast.success(`${t('toast.resendSuccess')}`);
          return data.data;
        } else {
          toast.error(t('toast.resendError'));
        }
      } catch (error) {
        toast.error(t('toast.resendError'));
      }
    },
    [t, validate],
  );

  return {
    resend,
    validate,
  };
};
