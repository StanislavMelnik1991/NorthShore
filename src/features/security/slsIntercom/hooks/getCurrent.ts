import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecuritySlsIntercom } from '@entities/types';

export const useGetCurrentSlsIntercom = (id: string) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SecuritySlsIntercom>();

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosApi.get<BaseResponse<SecuritySlsIntercom>>(
        `/services/sls_intercom/${id}`,
      );
      if (response?.data?.data) {
        setData(response.data.data);
      } else {
        console.error(response);
        toast.error(t('errors.getError'));
      }
    } catch (error) {
      toast.error(t('errors.getError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, t]);

  return {
    data,
    isLoading,
    getData,
  };
};
