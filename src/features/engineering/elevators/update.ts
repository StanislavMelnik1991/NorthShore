import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IElevation } from '@entities/types';
import { IP_PATTERN } from '@shared/constants';

export const useUpdateElevator = () => {
  const { t } = useTranslation();
  const schema = z.object({
    entrance_id: z.number().int(),
    ip_address: z.string().refine((value) => IP_PATTERN.test(value), {
      message: t('errors.invalidIp'),
    }),
    registry_address: z.string({ required_error: t('errors.required') }),
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

  type UpdateProps = {
    data: Partial<ValuesType>;
    id: string | number;
  };

  const update = useCallback(
    async ({ data, id }: UpdateProps) => {
      const errors = validate(data);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const result = await axiosApi.post<BaseResponse<IElevation>>(
          `/elevator/${id}`,
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
    [t, validate],
  );

  return {
    update,
    validate,
  };
};
