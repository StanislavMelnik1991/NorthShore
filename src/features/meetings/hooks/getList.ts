import { useCallback, useState } from 'react';
import { INews, ListParams } from '@entities/types';
import { useGetInfinityMeetingsList } from './getInfinityList';

interface Params extends ListParams {}

export const useGetUserMeetingsList = () => {
  const { getData: fetchData, isLoading, total } = useGetInfinityMeetingsList();
  const [data, setData] = useState<Array<INews>>([]);

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
