import { useCallback, useState } from 'react';
import { ITechWork, ListParams } from '@entities/types';
import { useGetInfinityTechnicalWorksList } from './getInfinityList';

interface Params extends ListParams {
  from?: number;
  to?: number;
  status_id?: number;
  type_id?: number;
  nature_id?: number;
}

export const useGetTechnicalWorksList = () => {
  const [data, setData] = useState<Array<ITechWork>>([]);
  const {
    hasMore,
    isLoading,
    total,
    getData: fetchData,
  } = useGetInfinityTechnicalWorksList();

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
