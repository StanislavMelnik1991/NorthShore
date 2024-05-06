import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecurityCamera } from '@entities/types';

export const useUpdateCamera = (id: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    rtsp_url: z
      .string()
      .min(1, t('errors.required'))
      .url(t('errors.invalidFormat')),
    rtsp_url_small: z
      .string()
      .min(1, t('errors.required'))
      .url(t('errors.invalidFormat')),
    address_entrance_id: z.number().int().optional(),
    address_building_id: z.number().int().optional(),
    address_street_id: z.number().int().optional(),
    comment: z.string().optional(),
    name: z.string().optional(),
    lat: z.number(),
    lon: z.number(),
    type_id: z.number().int(),
    entrances_ids: z.array(z.number().int()).min(1),
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
          `/services/camera/${id}`,
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
