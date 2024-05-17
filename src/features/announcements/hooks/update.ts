import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAnnouncement } from '@entities/types';

export const useUpdateAnnouncement = (id: string | number) => {
  const { t } = useTranslation();

  const schema = z.object({
    body: z
      .string({ required_error: t('errors.required') })
      .refine((val) => val !== '<p><br></p>', t('errors.required'))
      .optional(),
    title: z
      .string({ required_error: t('errors.required') })
      .max(256, t('errors.max256'))
      .optional(),
    recipient_groups: z
      .array(
        z.object({
          department_id: z
            .number({ required_error: t('errors.required') })
            .int(),
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
        const { data } = await axiosApi.post<BaseResponse<IAnnouncement>>(
          `/announcement/${id}`,
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
    [id, t, validate],
  );

  return {
    create,
    validate,
  };
};
