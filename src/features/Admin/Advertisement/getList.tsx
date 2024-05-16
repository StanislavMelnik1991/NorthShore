import { useCallback, useState } from 'react';
import { IAdvertisement, ListParams } from '@entities/types';
import { useGetInfinityAdvertisementsList } from './getInfinityList';

interface Params extends ListParams {
  from?: number;
  to?: number;
  status_id?: number;
  type_id?: number;
  nature_id?: number;
}

export const useGetAdvertisementsList = () => {
  const [data, setData] = useState<Array<IAdvertisement>>([]);
  const {
    hasMore,
    isLoading,
    total,
    getData: fetchData,
  } = useGetInfinityAdvertisementsList();

  const getData = useCallback(
    async (params: Params) => {
      const res = await fetchData(params);
      if (res) {
        setData(res);
      }
    },
    [fetchData],
  );
  return {
    getData,
    hasMore,
    isLoading,
    total,
    data,
  };
};
