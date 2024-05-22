import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, ILoginResponse } from '@entities/types';
import {
  ResendMethodsEnum,
  ResendReasonsEnum,
  TOKEN_LOCAL_STORAGE_KEY,
} from '@shared/constants';
import { useUser } from './useUser';

export const useResendCode = (id: string | number) => {
  const { setUser } = useUser();
  const { t } = useTranslation('auth');

  const schema = z.object({
    target_method: z.enum(
      Object.values(ResendMethodsEnum) as [string, ...string[]],
      {
        message: t('errors.invalidFormat'),
      },
    ),
    reason: z.enum(Object.values(ResendReasonsEnum) as [string, ...string[]], {
      message: t('errors.invalidFormat'),
    }),
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
        const { data } = await axiosApi.post<BaseResponse<ILoginResponse>>(
          `/user/${id}/confirmation/send`,
          body,
        );
        if (data && data.data && data.data.token) {
          localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, data.data.token);
          setUser?.(data.data);
          toast.success(`${t('toast.resendSuccess')} ${data.data.name}`);
          return data.data;
        } else {
          toast.error(t('toast.resendError'));
        }
      } catch (error) {
        toast.error(t('toast.resendError'));
      }
    },
    [id, setUser, t, validate],
  );

  return {
    resend,
    validate,
  };
};
