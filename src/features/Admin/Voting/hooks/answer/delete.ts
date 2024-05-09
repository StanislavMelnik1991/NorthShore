import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IVoting } from '@entities/types';

interface Props {
  electionId: string | number;
  questionId: string | number;
  variantId: string | number;
}

export const useDeleteAnswer = ({
  electionId,
  questionId,
  variantId,
}: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axiosApi.delete<BaseResponse<IVoting>>(
        `/election/${electionId}/question/${questionId}/variant/${variantId}`,
      );
      toast.success(t('toast.deleteSuccess'));
      return data;
    } catch (error) {
      console.error(error);
      toast.error(t('toast.deleteError'));
    } finally {
      setLoading(false);
    }
  }, [electionId, questionId, t, variantId]);

  return {
    handleDelete,
    loading,
  };
};
