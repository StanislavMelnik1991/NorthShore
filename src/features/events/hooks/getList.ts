import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import {
  BaseResponse,
  INews,
  INewsFilter,
  INewsSort,
  ListParams,
} from '@entities/types';

interface Params extends ListParams {
  sort: INewsSort;
  filter: INewsFilter;
}

export const useGetUserEventsList = () => {
  const { t } = useTranslation('news');
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const getData = useCallback(
    async (params: Params) => {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await axiosApi.get<BaseResponse<Array<INews>>>('/events', {
          params,
        });
        // toDo: update from server
        setTotal(data.length);
        return data;
      } catch (error) {
        toast.error(t('toast.listError'));
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  return {
    getData,
    isLoading,
    total,
  };
};
