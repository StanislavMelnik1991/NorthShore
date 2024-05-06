import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IApartmentFull } from '@entities/types';

export const useApartmentsList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<IApartmentFull>>([]);

  const getData = useCallback(
    async (entranceId: string | number) => {
      setIsLoading(true);
      try {
        const {
          data: { data: newData },
        } = await axiosApi.get<BaseResponse<Array<IApartmentFull>>>(
          `/services/entrance/${entranceId}/apartments`,
        );
        if (newData) {
          setData(newData);
        } else {
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

  const clearData = useCallback(() => {
    setData([]);
  }, []);

  return {
    getData,
    clearData,
    data,
    isLoading,
  };
};
