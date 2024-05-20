import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentService } from '@features/Admin';
import { IUserService } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useCurrent = () => {
  const { t, i18n } = useTranslation('services');

  const { id } = useParams<{ id: string }>() as { id: string };
  const [data, setData] = useState<IUserService>();
  const { getData, isLoading } = useGetCurrentService();

  const handleGetData = useCallback(async () => {
    const newData = await getData(id);
    if (newData) {
      setData(newData);
    }
  }, [getData, id]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return {
    data,
    isLoading: isLoading,
    t,
    language: i18n.language as LanguageEnum,
  };
};
