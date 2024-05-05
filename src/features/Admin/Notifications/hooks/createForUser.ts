import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

export const useCreateUserNotification = (userId: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    url: z.string().url(t('errors.invalidFormat')).optional(),
    body: z.string({ required_error: t('errors.required') }),
    title: z
      .string({ required_error: t('errors.required') })
      .max(256, t('errors.max256')),

    need_push: z.boolean().default(false),
    image_id: z.number().optional(),
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
  const create = useCallback(
    async (body: Partial<ValuesType>) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const {
          data: { data },
        } = await axiosApi.put<BaseResponse<INews>>(
          `/user/${userId}/notifications`,
          body,
        );
        toast.success(t('toast.createSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.createError'));
      }
    },
    [t, userId, validate],
  );

  return {
    create,
    validate,
  };
};
