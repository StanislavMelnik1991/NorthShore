import { useCallback, useState } from 'react';
import { IElevation, ListParams } from '@entities/types';
import { useGetInfinityElevatorsList } from './getInfinityList';

interface Params extends ListParams {
  building_id?: number;
  entrance_id?: number;
  street_id?: number;
  is_accident?: true;
}

export const useGetIElevatorsList = () => {
  const {
    getData: fetchData,
    isLoading,
    total,
  } = useGetInfinityElevatorsList();
  const [data, setData] = useState<Array<IElevation>>([]);

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
