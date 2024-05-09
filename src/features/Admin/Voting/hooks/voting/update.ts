import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';

export const useUpdateVoting = (id: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    title_en: z
      .string({ required_error: t('errors.required') })
      .max(256, t('errors.max256'))
      .optional(),
    title_ru: z
      .string({ required_error: t('errors.required') })
      .max(256, t('errors.max256'))
      .optional(),
    body_en: z.string({ required_error: t('errors.required') }).optional(),
    body_ru: z.string({ required_error: t('errors.required') }).optional(),
    need_push: z.boolean().default(false).optional(),
    is_archive: z.boolean().default(false).optional(),
    date_finish: z.date({ required_error: t('errors.required') }).optional(),
    show_result: z.boolean().default(false).optional(),
    status_id: z.number().int().optional(),
    recipient_groups: z
      .array(
        z.object({
          street_id: z.number().int().optional(),
          building_id: z.number().int().optional(),
          entrance_id: z.number().int().optional(),
          apartment_id: z.number().int().optional(),
        }),
      )
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
        const {
          data: { data },
        } = await axiosApi.post<BaseResponse<IVoting>>(`/election/${id}`, {
          ...body,
          date_finish: body.date_finish
            ? Math.ceil(body.date_finish.getTime() / 1000)
            : undefined,
        });
        toast.success(t('toast.updateSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.updateError'));
      }
    },
    [id, t, validate],
  );

  return {
    update,
    validate,
  };
};
