import { useCallback, useState } from 'react';
import { IHeatingPoint, ListParams } from '@entities/types';
import { useGetInfinityHeatingList } from './getInfinityList';

interface Params extends ListParams {
  building_id?: number;
  entrance_id?: number;
  street_id?: number;
  is_accident?: true;
}

export const useGetUserHeatingList = () => {
  const { getData: fetchData, isLoading, total } = useGetInfinityHeatingList();
  const [data, setData] = useState<Array<IHeatingPoint>>([]);

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
    data,
    isLoading,
    total,
  };
};
