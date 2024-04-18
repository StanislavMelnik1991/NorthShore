import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse } from '@entities/types';
import { IRequest } from '@entities/types/request.interface';

export const useCreateRequest = () => {
  const { t } = useTranslation('invocation');
  const schema = z.object({
    title: z.string().min(1, t('errors.required')).max(256, t('errors.max256')),
    content: z
      .string()
      .min(1, t('errors.required'))
      .refine((val) => val !== '<p><br></p>', t('errors.required')),
    theme_id: z.number().min(1).int(),
    contact_fio: z
      .string()
      .min(1, t('errors.required'))
      .max(256, t('errors.max256')),
    contact_phone: z
      .string()
      .min(1, t('errors.required'))
      .max(256, t('errors.max256')),
    files: z.array(
      z.object({
        id: z.number().int(),
        url: z.string(),
      }),
    ),
  });

  type ValuesType = z.infer<typeof schema>;

  const validate = useCallback(
    (request: unknown) => {
      const res = schema.safeParse(request) as SafeParseError<ValuesType>;
      if (res.error) {
        return res.error.formErrors.fieldErrors;
      }
    },
    [schema],
  );

  const create = useCallback(
    async (request: ValuesType) => {
      const errors = validate(request);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const {
          data: { data },
        } = await axiosApi.put<BaseResponse<IRequest>>('/requests', request);
        if (!data.id) {
          throw new Error();
        }
        toast.success(t('toast.requestCreateSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.requestCreateError'));
      }
    },
    [t, validate],
  );

  return {
    create,
    validate,
  };
};
