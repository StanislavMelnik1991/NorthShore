import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';

export const useUpdateTechWork = () => {
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
    recipient_groups: z.array(
      z.object({
        street_id: z.number().int().optional(),
        building_id: z.number().int().optional(),
        entrance_id: z.number().int().optional(),
        apartment_id: z.number().int().optional(),
      }),
    ),
    url: z
      .string({ required_error: t('errors.required') })
      .url(t('errors.invalidFormat'))
      .optional(),
    date_start: z.number({ required_error: t('errors.required') }).int(),
    date_end: z.number({ required_error: t('errors.required') }).int(),
    type_id: z.number({ required_error: t('errors.required') }).int(),
    nature_id: z.number({ required_error: t('errors.required') }).int(),
    responsible_id: z.number({ required_error: t('errors.required') }).int(),
    need_push: z.boolean({ required_error: t('errors.required') }),
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
  type Props = {
    body: Partial<ValuesType>;
    id: number | string;
  };
  const update = useCallback(
    async ({ body, id }: Props) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const { data } = await axiosApi.post<BaseResponse<IVoting>>(
          `/tech_work/${id}`,
          { ...body, is_archive: 0, status_id: 1 },
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
    [t, validate],
  );

  return {
    update,
    validate,
  };
};
