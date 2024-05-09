import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAnswer } from '@entities/types';

interface Props {
  electionId: string | number;
  questionId: string | number;
  variantId: string | number;
}

export const useGetCurrentAnswer = ({
  electionId,
  questionId,
  variantId,
}: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IAnswer>();
  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosApi.get<BaseResponse<IAnswer>>(
        `/election/${electionId}/question/${questionId}/variant/${variantId}`,
      );
      if (result.data.data) {
        setData(result.data.data);
      } else {
        toast.error(t('errors.getError'));
      }
    } catch (error) {
      toast.error(t('errors.getError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [electionId, questionId, t, variantId]);

  return {
    getData,
    isLoading,
    data,
  };
};
