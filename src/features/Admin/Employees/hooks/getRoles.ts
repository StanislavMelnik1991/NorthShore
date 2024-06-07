import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { ISelectOption } from '@entities/components';
import { BaseResponse, IRole } from '@entities/types';

const INITIAL_ROLE = { label: 'Без роли', value: 0 };

export const useGetRoles = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<Array<ISelectOption>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<ISelectOption | null>(INITIAL_ROLE);

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosApi.get<BaseResponse<Array<IRole>>>(`/roles`);
      if (data?.data) {
        const res: Array<ISelectOption> = data.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        res.unshift(INITIAL_ROLE);

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
