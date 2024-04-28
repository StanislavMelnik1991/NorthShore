import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, SecuritySipAccount } from '@entities/types';

export const useGetSipAccountList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<SecuritySipAccount>>([]);
  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<Array<SecuritySipAccount>>>(
        '/services/sip_accounts',
      );

      setData(data);
      return data;
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
