import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseEntity, BaseResponse } from '@entities/types';

export const useAddIntercom = () => {
  const { t } = useTranslation();

  const schema = z.object({
    user_id: z.number({ required_error: t('errors.required') }).int(),
    intercom_id: z.number({ required_error: t('errors.required') }).int(),
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
      try {
        const { data } = await axiosApi.put<BaseResponse<BaseEntity>>(
          '/additional_intercoms',
          body,
        );
        if (data && data.data && data.data.id) {
          toast.success(t('toast.createSuccess'));
          return data.data;
        } else {
          toast.error(t('toast.createError'));
        }
      } catch (error) {
        console.error(error);
        toast.error(t('toast.createError'));
      }
    },
    [t],
  );

  return {
    update,
    validate,
  };
};
