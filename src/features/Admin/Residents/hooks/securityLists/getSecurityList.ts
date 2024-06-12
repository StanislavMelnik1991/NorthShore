import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { ISelectOption } from '@entities/components';
import { BaseEntity, BaseResponse } from '@entities/types';

interface IResponse extends BaseEntity {}

type PathType = 'intercoms' | 'cameras' | 'access_points';

export const useGetSecurityList = (path: PathType) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<Array<ISelectOption>>([]);
  const [selected, setSelected] = useState<ISelectOption | null>(null);

  const getData = useCallback(async () => {
    try {
      const { data } = await axiosApi.get<BaseResponse<Array<IResponse>>>(
        `/services/short/${path}`,
      );
      if (data?.data) {
        const res: Array<ISelectOption> = data.data.map(({ id, name }) => ({
          label: `№${id} ${name}`,
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
    }
  }, [path, t]);

  const handleOnChange = useCallback((val: unknown) => {
    if (val && (val as ISelectOption).value && (val as ISelectOption).label) {
      setSelected(val as ISelectOption);
    } else {
      setSelected(null);
    }
  }, []);

  return {
    getData,
    options,
    selected,
    setSelected: handleOnChange,
  };
};
