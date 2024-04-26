import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecurityCamera } from '@entities/types';
import { IP_PATTERN } from '@shared/constants/regexp';

export const useUpdateAccess = (id: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    name: z.string(),
    entrances_ids: z.array(z.number().int()),
    login: z.string({ required_error: t('errors.required') }),
    password: z.string({ required_error: t('errors.required') }),
    ip_address: z
      .string({ required_error: t('errors.required') })
      .refine((value) => IP_PATTERN.test(value), {
        message: t('errors.invalidIp'),
      }),
    type_id: z.number({ required_error: t('errors.required') }).int(),
    http_login: z.string({ required_error: t('errors.required') }),
    http_password: z.string({ required_error: t('errors.required') }),
    address_entrance_id: z.number().int().optional(),
    address_building_id: z.number().int().optional(),
    address_street_id: z.number().int().optional(),
    comment: z.string(),
    lat: z.number({ required_error: t('errors.required') }),
    lon: z.number({ required_error: t('errors.required') }),
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
        const result = await axiosApi.post<BaseResponse<SecurityCamera>>(
          `/access_point/${id}`,
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
