import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';
import { PASSWORD_REGEX } from '@shared/constants';

export const useUpdateEmployee = () => {
  const { t } = useTranslation();

  const schema = z.object({
    group_id: z
      .number({ required_error: t('errors.required') })
      .int()
      .nullable(),
    department_id: z
      .number({ required_error: t('errors.required') })
      .int()
      .optional()
      .nullable(),
    phone_number: z
      .string({ required_error: t('errors.required') })
      .optional()
      .nullable(),
    email: z.string().optional().nullable(),
    role_id: z.number().int().optional().nullable(),
    job_title: z.string().optional().nullable(),
    work_phone: z
      .string({ required_error: t('errors.required') })
      .optional()
      .nullable(),
    password: z
      .string({ required_error: t('errors.required') })
      .min(1, t('errors.required'))
      .regex(PASSWORD_REGEX, t('errors.passwordPattern'))
      .optional()
      .nullable(),
    name: z
      .string({ required_error: t('errors.required') })
      .optional()
      .nullable(),
    id_1c: z.string().optional().nullable(),
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
    async (body: Partial<ValuesType>, id: string) => {
      try {
        const { data } = await axiosApi.post<BaseResponse<IVoting>>(
          `/user/${id}`,
          {
            ...body,
          },
        );
        if (data && data.data && data.data.id) {
          toast.success(t('toast.updateSuccess'));
          return data.data;
        } else {
          toast.error(t('toast.updateError'));
        }
      } catch (error) {
        console.error(error);
        toast.error(t('toast.updateError'));
      }
    },
    [t],
  );

  return {
    update,
    validate,
  };
};
