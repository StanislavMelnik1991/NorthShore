import { useCallback, useState } from 'react';
import { ILoyalty, ListParams } from '@entities/types';
import { useGetInfinityLoyaltyList } from './getInfinityList';

interface Params extends ListParams {
  from?: number;
  to?: number;
  status_id?: number;
  type_id?: number;
  nature_id?: number;
}

export const useGetLoyaltyList = () => {
  const [data, setData] = useState<Array<ILoyalty>>([]);
  const {
    hasMore,
    isLoading,
    total,
    getData: fetchData,
  } = useGetInfinityLoyaltyList();

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
