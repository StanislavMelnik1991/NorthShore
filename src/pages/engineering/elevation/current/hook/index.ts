import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetCurrentElevator } from '@features/engineering';

export const useCurrentEnergy = () => {
  const { t } = useTranslation('engineering');
  const { data, getData, isLoading } = useGetCurrentElevator();
  const { id } = useParams<{ id: string }>() as { id: string };

  const handleGetData = useCallback(() => {
    getData(id);
  }, [getData, id]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGetData();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [handleGetData]);
  return {
    t,
    data,
    isLoading: !data && isLoading,
    id,
  };
};
