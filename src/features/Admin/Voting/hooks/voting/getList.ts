import { useCallback, useState } from 'react';
import { IVoting, ListParams } from '@entities/types';
import { useGetInfinityVotingList } from './getInfinityList';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
  status_id?: number;
}

export const useGetVotingList = () => {
  const { getData: fetchData, isLoading, total } = useGetInfinityVotingList();
  const [data, setData] = useState<Array<IVoting>>([]);

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
