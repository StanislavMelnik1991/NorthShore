import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IUserService } from '@entities/types';

export const useCreateService = () => {
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
    company_name: z.string({ required_error: t('errors.required') }).optional(),
    company_address: z
      .string({ required_error: t('errors.required') })
      .optional(),
    url: z.string({ required_error: t('errors.required') }).optional(),
    contact_fio: z.string({ required_error: t('errors.required') }).optional(),
    image_id: z
      .number({ required_error: t('errors.required') })
      .int()
      .optional(),
    contact_phone: z
      .string({ required_error: t('errors.required') })
      .optional(),
    phone_numbers: z.array(z.string()),
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
        const { data } = await axiosApi.put<BaseResponse<IUserService>>(
          '/user_services',
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
    create,
    validate,
  };
};
