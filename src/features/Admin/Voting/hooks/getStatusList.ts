import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { ISelectOption } from '@entities/components';
import { BaseResponse, BaseEntity } from '@entities/types';

export const useVotingStatusList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<BaseEntity>>([]);
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const {
        data: { data: newData },
      } =
        await axiosApi.get<BaseResponse<Array<BaseEntity>>>(
          `/election_statuses`,
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
    options: data.map(({ id, name }) => {
      return { value: id, label: name };
    }),
    selected,
    setSelected,
  };
};
