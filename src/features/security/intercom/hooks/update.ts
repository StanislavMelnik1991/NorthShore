import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecurityIntercom } from '@entities/types';
import { IP_PATTERN } from '@shared/constants/regexp';

export const useUpdateIntercom = (id: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    name: z.string().optional().nullable(),
    comment: z.string().optional().nullable(),
    rtsp_url: z.string({ required_error: t('errors.required') }),
    mp4_url: z
      .string({ required_error: t('errors.required') })
      .url(t('errors.invalidFormat')),
    hls_url: z
      .string({ required_error: t('errors.required') })
      .url(t('errors.invalidFormat')),
    login: z.string({ required_error: t('errors.required') }),
    password: z.string({ required_error: t('errors.required') }),
    http_login: z.string({ required_error: t('errors.required') }),
    http_password: z.string({ required_error: t('errors.required') }),
    ip_address: z
      .string({ required_error: t('errors.required') })
      .refine((value) => IP_PATTERN.test(value), {
        message: t('errors.invalidIp'),
      }),
    entrance_id: z.number({ required_error: t('errors.required') }).int(),
    sip_account_id: z.number({ required_error: t('errors.required') }).int(),
    type_id: z.number({ required_error: t('errors.required') }).int(),
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
        const result = await axiosApi.post<BaseResponse<SecurityIntercom>>(
          `/intercom/${id}`,
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
