import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

export const useCreateNotification = () => {
  const { t } = useTranslation();
  const schema = z.object({
    title_en: z
      .string({ required_error: t('errors.required') })
      .max(256, t('errors.max256')),
    title_ru: z
      .string({ required_error: t('errors.required') })
      .max(256, t('errors.max256')),
    body_en: z.string({ required_error: t('errors.required') }),
    body_ru: z.string({ required_error: t('errors.required') }),
    need_push: z.boolean().default(false),
    image_id: z.number().optional(),
    url: z.string().url(t('errors.invalidFormat')).optional(),
    recipient_groups: z.array(
      z.object({
        street_id: z.number().int().optional(),
        building_id: z.number().int().optional(),
        entrance_id: z.number().int().optional(),
        apartment_id: z.number().int().optional(),
      }),
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
        } = await axiosApi.put<BaseResponse<INews>>('/all_notifications', body);
        toast.success(t('toast.createSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.createError'));
      }
    },
    [t, validate],
  );

  return {
    create,
    validate,
  };
};
