import { useCallback, useState } from 'react';
import { IUserService, ListParams } from '@entities/types';
import { useGetInfinityServiceList } from './getInfinityList';

interface Params extends ListParams {
  from?: number;
  to?: number;
  status_id?: number;
  type_id?: number;
  nature_id?: number;
}

export const useGetServiceList = () => {
  const [data, setData] = useState<Array<IUserService>>([]);
  const {
    hasMore,
    isLoading,
    total,
    getData: fetchData,
  } = useGetInfinityServiceList();

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
