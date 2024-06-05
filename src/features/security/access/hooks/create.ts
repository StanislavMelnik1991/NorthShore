import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecurityAccess } from '@entities/types';
import { IP_PATTERN } from '@shared/constants/regexp';

export const useCreateAccess = () => {
  const { t } = useTranslation();
  const schema = z.object({
    name: z.string({ required_error: t('errors.required') }),
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
    comment: z.string().optional().nullable(),
    lat: z.number({ required_error: t('errors.required') }),
    lon: z.number({ required_error: t('errors.required') }),
  });

  type ValuesType = z.infer<typeof schema>;

  const validate = useCallback(
    (data: unknown) => {
      const res = schema.safeParse(data) as SafeParseError<ValuesType>;
      if (res.error) {
        console.warn(res.error.formErrors.fieldErrors);
        return res.error.formErrors.fieldErrors;
      }
    },
    [schema],
  );

  const create = useCallback(
    async (data: Partial<ValuesType>) => {
      const errors = validate(data);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const result = await axiosApi.put<BaseResponse<SecurityAccess>>(
          '/access_points',
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
    create,
    validate,
  };
};
