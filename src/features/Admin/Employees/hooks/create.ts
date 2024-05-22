import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';

export const useCreateEmployee = () => {
  const { t } = useTranslation();

  const schema = z.object({
    group_id: z.number({ required_error: t('errors.required') }).int(),
    department_id: z.number().int().optional(),
    phone_number: z.string().optional(),
    email: z.string().optional(),
    role_id: z.number().int().optional(),
    job_title: z.string().optional(),
    work_phone: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
  });

  type ValuesType = z.infer<typeof schema>;

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
  };
};
