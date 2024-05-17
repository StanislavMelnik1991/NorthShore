import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAdvertisement } from '@entities/types';

export const useGetCurrentAdvertisement = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IAdvertisement>();

  const getData = useCallback(
    async (id: string | number) => {
      setIsLoading(true);
      try {
        const { data } = await axiosApi.get<BaseResponse<IAdvertisement>>(
          `/advert/${id}`,
        );
        if (data?.data) {
          setData(data.data);
          return data.data;
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

  return {
    getData,
    isLoading,
    data,
  };
};
