import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IQuestion } from '@entities/types';

interface Props {
  electionId: string | number;
  questionId: string | number;
}

export const useGetCurrentQuestion = ({ electionId, questionId }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IQuestion>();
  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axiosApi.get<BaseResponse<IQuestion>>(
        `/election/${electionId}/question/${questionId}`,
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
  }, [electionId, questionId, t]);

  return {
    getData,
    isLoading,
    data,
  };
};
