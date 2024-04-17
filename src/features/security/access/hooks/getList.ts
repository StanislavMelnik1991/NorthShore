import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecurityAccess } from '@entities/types';

export const useGetSecurityAccessList = () => {
  const { t } = useTranslation('security');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecurityAccess>>([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } =
        await axiosApi.get<BaseResponse<Array<SecurityAccess>>>(
          '/access_points',
        );
      if (data) {
        setData(data);
      } else {
        toast.error(t('toast.listError'));
      }
    } catch (error) {
      toast.error(t('toast.listError'));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  return {
    getData,
    data,
    isLoading,
  };
};
