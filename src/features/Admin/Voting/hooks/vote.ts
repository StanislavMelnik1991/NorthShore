import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';

interface Props {
  electionId: string | number;
  questionId: string | number;
  variantId: string | number;
}

export const useVoteForCurrentAnswer = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const vote = useCallback(
    async ({ electionId, questionId, variantId }: Props) => {
      try {
        setIsLoading(true);
        const result = await axiosApi.get(
          `/vote/${electionId}/${questionId}/${variantId}`,
        );
        if (!result.data.data) {
          toast.error(t('errors.getError'));
        }
      } catch (error) {
        toast.error(t('errors.getError'));
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return {
    vote,
    isLoading,
  };
};
