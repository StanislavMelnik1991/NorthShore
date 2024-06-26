import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentVoting } from '@features/Admin';
import { IAnswer, IVoting } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const usePage = () => {
  const { t, i18n } = useTranslation('voting');
  const { id } = useParams<{ id: string }>() as { id: string };
  const [data, setData] = useState<IVoting>();
  const { getData, isLoading } = useGetCurrentVoting(id);
  const [answer, setAnswer] = useState<IAnswer>();

  const handleGetData = useCallback(async () => {
    const newData = await getData();
    if (newData) {
      setData(newData);
    }
  }, [getData]);

  const handleShowAnswerDetails = useCallback(
    (answer: IAnswer) => () => {
      setAnswer(answer);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setAnswer(undefined);
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return {
    data,
    isLoading,
    t,
    id,
    handleShowAnswerDetails,
    answer,
    handleCloseModal,
    userLanguage: i18n.language as LanguageEnum,
  };
};
