import { useCallback, useState } from 'react';
import { IAnnouncement, ListParams } from '@entities/types';
import { useGetInfinityAnnouncementsList } from './getInfinityList';

export const useGetAnnouncementsList = () => {
  const [data, setData] = useState<Array<IAnnouncement>>([]);
  const {
    getData: fetchData,
    hasMore,
    isLoading,
    total,
  } = useGetInfinityAnnouncementsList();

  const getData = useCallback(
    async (params: ListParams) => {
      const res = await fetchData(params);
      if (res) {
        setData(res);
      }
    },
    [fetchData],
  );

  return { data, hasMore, isLoading, getData, total };
};
