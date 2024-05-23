import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUser } from '@entities/types';

export const useUpdateMe = () => {
  const { t } = useTranslation();

  const schema = z.object({
    phone_number: z.string().optional(),
    email: z.string().email(t('errors.invalidFormat')).optional(),
    accept_intercom: z.number().int(t('errors.invalidFormat')).optional(),
    avatar: z.string().optional(),
    two_fa: z.number().int(t('errors.invalidFormat')).optional(),
    lang: z.string().optional(),
    name: z.string().optional(),
    surname: z.string().optional(),
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
    async (body: ValuesType) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const { data } = await axiosApi.post<BaseResponse<IUser>>(
          `/user`,
          body,
        );
        if (data && data.data && data.data.id) {
          toast.success(t('toast.updateSuccess'));
          return data.data;
        } else {
          toast.error(t('toast.updateError'));
        }
      } catch (error) {
        console.error(error);
        toast.error(t('toast.updateError'));
      }
    },
    [t, validate],
  );

  return {
    validate,
    update,
  };
};
