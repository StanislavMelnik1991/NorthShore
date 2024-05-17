import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, IAccessCode } from '@entities/types';

type DataType = Record<
  string,
  Array<{ id: number; name: string; isSelected: boolean }>
>;

export const useGetAccessCodesList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } =
        await axiosApi.get<BaseResponse<Array<IAccessCode>>>(`/access_codes`);
      if (data?.data) {
        return data.data.reduce((acc: DataType, data: IAccessCode) => {
          if (!acc[data.section_name]) {
            acc[data.section_name] = [];
          }
          acc[data.section_name].push({
            id: data.id,
            name: data.name,
            isSelected: false,
          });
          return acc;
        }, {});
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
  return {
    getData,
    isLoading,
  };
};
