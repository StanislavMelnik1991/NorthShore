import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IRole } from '@entities/types';

export const useUpdateRole = (id: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    name: z
      .string({ required_error: t('errors.required') })
      .min(1, t('errors.required'))
      .optional(),
    description: z
      .string({ required_error: t('errors.required') })
      .min(1, t('errors.required'))
      .optional(),
    access_codes: z.array(z.number().int()).optional(),
  });

  type ValuesType = z.infer<typeof schema>;

  const validate = useCallback(
    (data: Partial<ValuesType>) => {
      const res = schema.safeParse(data) as SafeParseError<ValuesType>;
      if (res.error) {
        console.warn(res.error.formErrors.fieldErrors);
        return res.error.formErrors.fieldErrors;
      }
    },
    [schema],
  );

  const update = useCallback(
    async (data: Partial<ValuesType>) => {
      const errors = validate(data);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const result = await axiosApi.post<BaseResponse<IRole>>(
          `/role/${id}`,
          data,
        );
        if (result.data.data) {
          toast.success(t('toast.createSuccess'));
          return result.data.data;
        } else {
          console.error(result);
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
    update,
    validate,
  };
};
