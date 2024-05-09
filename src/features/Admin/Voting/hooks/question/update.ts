import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IQuestion } from '@entities/types';

export const useUpdateQuestion = (electionId: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    body_en: z.string().optional(),
    body_ru: z.string().optional(),
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

  const update = useCallback(
    async ({ body, questionId }: CreationProps) => {
      const errors = validate(body);
      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(`${key}: ${value}`);
        });
        return;
      }
      try {
        const {
          data: { data },
        } = await axiosApi.post<BaseResponse<IQuestion>>(
          `/election/${electionId}/question/${questionId}`,
          body,
        );
        // toast.success(t('toast.updateSuccess'));
        return data;
      } catch (error) {
        console.error(error);
        toast.error(t('toast.updateError'));
      }
    },
    [electionId, t, validate],
  );

  return {
    update,
    validate,
  };
};
