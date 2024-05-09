import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAnswer } from '@entities/types';

interface Props {
  electionId: string | number;
}

export const useCreateAnswer = ({ electionId }: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    body_en: z.string({ required_error: t('errors.required') }),
    body_ru: z.string({ required_error: t('errors.required') }),
    image_id: z.number().int().optional(),
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

  interface CreationProps {
    body: Partial<ValuesType>;
    questionId: string | number;
  }

  const create = useCallback(
    async ({ body, questionId }: CreationProps) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        setLoading(true);
        const { data } = await axiosApi.put<BaseResponse<IAnswer>>(
          `/election/${electionId}/question/${questionId}/variants`,
          body,
        );
        if (data && data.data && data.data.id) {
          // toast.success(t('toast.createSuccess'));
          return data.data;
        } else {
          toast.error(t('toast.createError'));
        }
      } catch (error) {
        console.error(error);
        toast.error(t('toast.createError'));
      } finally {
        setLoading(false);
      }
    },
    [electionId, t, validate],
  );

  return {
    create,
    validate,
    loading,
  };
};
