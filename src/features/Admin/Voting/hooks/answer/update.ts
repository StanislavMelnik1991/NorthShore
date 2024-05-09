import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SafeParseError, z } from 'zod';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAnswer } from '@entities/types';

export const useUpdateAnswer = (electionId: string | number) => {
  const { t } = useTranslation();
  const schema = z.object({
    body_en: z.string().optional(),
    body_ru: z.string().optional(),
    image_en_id: z.number().int().optional(),
    image_ru_id: z.number().int().optional(),
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
    answerId: string | number;
  }

  const update = useCallback(
    async ({ body, questionId, answerId }: CreationProps) => {
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
        } = await axiosApi.post<BaseResponse<IAnswer>>(
          `/election/${electionId}/question/${questionId}/variant/${answerId}`,
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
