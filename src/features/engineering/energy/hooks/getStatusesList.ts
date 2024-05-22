import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { ISelectOption } from '@entities/components';
import { BaseResponse, BaseEntity } from '@entities/types';

export const useGetEnergyStatusesTypesList = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<Array<ISelectOption>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosApi.get<BaseResponse<Array<BaseEntity>>>(
        `/power_consumer_charge_statuses`,
      );
      if (data?.data) {
        const res: Array<ISelectOption> = data.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(res);
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
  }, [t]);

  return {
    getData,
    isLoading,
    options,
    selected,
    setSelected,
  };
};
