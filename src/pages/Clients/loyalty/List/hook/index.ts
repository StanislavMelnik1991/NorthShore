import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetInfinityLoyaltyList } from '@features/Admin';
import { ILoyalty, ListParams } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

interface Params extends ListParams {
  status_id?: number;
  from?: number;
  to?: number;
}

export const useList = () => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total } = useGetInfinityLoyaltyList();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Array<ILoyalty>>([]);

  const handleLoadData = useCallback(async () => {
    const newsParams: Params = {
      page: page,
      perPage: 18,
      // status_id: status?.value || undefined,
    };
    const newData = await getData(newsParams);
    if (newData) {
      setData((val) => [...val, ...newData]);
      setPage((val) => val + 1);
    }
  }, [getData, page]);

  useEffect(() => {
    const newsParams: Params = {
      page: 1,
      perPage: 18,
    };
    getData(newsParams).then((news) => {
      if (news) {
        setData(news);
        setPage((val) => val + 1);
      }
    });
  }, [getData]);

  return {
    data,
    isLoading,
    t,
    lang: i18n.language as LanguageEnum,
    hasMore: page < total,
    handleLoadData,
  };
};
