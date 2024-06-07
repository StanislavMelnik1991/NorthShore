import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';
import { PASSWORD_REGEX } from '@shared/constants';

export const useCreateEmployee = () => {
  const { t } = useTranslation();

  const schema = z.object({
    group_id: z.number({ required_error: t('errors.required') }).int(),
    department_id: z
      .number({ required_error: t('errors.required') })
      .int()
      .optional(),
    phone_number: z.string({ required_error: t('errors.required') }),
    email: z.string().optional(),
    role_id: z.number().int().optional(),
    job_title: z.string().optional(),
    work_phone: z.string({ required_error: t('errors.required') }).optional(),
    password: z
      .string({ required_error: t('errors.required') })
      .min(1, t('errors.required'))
      .regex(PASSWORD_REGEX, t('errors.passwordPattern')),
    name: z.string({ required_error: t('errors.required') }),
    id_1c: z.string().optional(),
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
      try {
        const { data } = await axiosApi.put<BaseResponse<IVoting>>('/users', {
          ...body,
        });
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
    create,
    validate,
  };
};
