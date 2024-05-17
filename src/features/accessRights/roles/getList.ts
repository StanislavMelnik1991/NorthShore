import { useCallback, useState } from 'react';
import { IRole, INewsFilter, INewsSort, ListParams } from '@entities/types';
import { useGetInfinityRolesList } from './getInfinityList';

interface Params extends ListParams {
  sort?: INewsSort;
  filter?: INewsFilter;
}

export const useGetRolesList = () => {
  const { getData: fetchData, isLoading, total } = useGetInfinityRolesList();
  const [data, setData] = useState<Array<IRole>>([]);

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
