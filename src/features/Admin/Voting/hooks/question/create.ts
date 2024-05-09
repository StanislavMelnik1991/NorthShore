import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IQuestion } from '@entities/types';

export const useCreateQuestion = (votingId: string | number) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    body_en: z.string({ required_error: t('errors.required') }),
    body_ru: z.string({ required_error: t('errors.required') }),
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
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        setLoading(true);
        const {
          data: { data },
        } = await axiosApi.put<BaseResponse<IQuestion>>(
          `/election/${votingId}/questions`,
          body,
        );
        // toast.success(t('toast.createSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.createError'));
      } finally {
        setLoading(false);
      }
    },
    [t, validate, votingId],
  );

  return {
    create,
    validate,
    loading,
  };
};
