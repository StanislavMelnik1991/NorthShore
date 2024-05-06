import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecurityType } from '@entities/types';

export const useAccessTypeList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecurityType>>([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data: newData },
      } =
        await axiosApi.get<BaseResponse<Array<SecurityType>>>(
          `/access_point_types`,
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
  }, [t]);

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
