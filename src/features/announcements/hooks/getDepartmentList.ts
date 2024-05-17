import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { ISelectOption } from '@entities/components';
import { BaseResponse, IDepartment } from '@entities/types';

export const useGetDepartmentList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<ISelectOption>>([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } =
        await axiosApi.get<BaseResponse<Array<IDepartment>>>(`/departments`);
      if (data?.data) {
        const options: Array<ISelectOption> = data.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setData(options);
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
    data,
  };
};
