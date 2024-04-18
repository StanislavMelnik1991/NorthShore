import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, INews } from '@entities/types';

export const useCreateMeeting = () => {
  const { t } = useTranslation('meetings');
  const schema = z
    .object({
      title_en: z
        .string()
        .min(1, t('errors.required'))
        .max(256, t('errors.max256')),
      title_ru: z
        .string()
        .min(1, t('errors.required'))
        .max(256, t('errors.max256')),
      html_content_en: z
        .string()
        .min(1, t('errors.required'))
        .refine((val) => val !== '<p><br></p>', t('errors.required')),
      html_content_ru: z
        .string()
        .min(1, t('errors.required'))
        .refine((val) => val !== '<p><br></p>', t('errors.required')),
      cover: z.string().url().nullable(),
      status: z.number().int().min(0).max(2),
      target_date: z.date(),
      meeting_link: z.string().url(t('errors.invalidFormat')).nullable(),
    })
    .required();

  type ValuesType = z.infer<typeof schema>;

  const validate = useCallback(
    (news: ValuesType) => {
      const res = schema.safeParse(news) as SafeParseError<ValuesType>;
      if (res.error) {
        return res.error.formErrors.fieldErrors;
      }
    },
    [schema],
  );

  const create = useCallback(
    async (event: ValuesType) => {
      const errors = validate(event);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const {
          data: { data },
        } = await axiosApi.put<BaseResponse<INews>>('/news', {
          ...event,
          target_date: Math.ceil(new Date(event.target_date).getTime() / 1000),
          is_meeting: 1,
        });
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
