import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetInfinityNewsList } from '@features/news';
import { INews, ListParams } from '@entities/types';
import { LanguageEnum } from '@shared/constants';

export const useNewsListPage = () => {
  const { t, i18n } = useTranslation('news');
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Array<INews>>([]);
  const { getData, isLoading, hasMore } = useGetInfinityNewsList();

  const handleLoadNews = useCallback(async () => {
    const newsParams: ListParams = {
      page: page,
      perPage: 18,
    };
    const news = await getData(newsParams);
    if (news) {
      setData((val) => [...val, ...news]);
      setPage((val) => val + 1);
    }
  }, [getData, page]);

  useEffect(() => {
    const newsParams: ListParams = {
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
    hasMore,
    handleLoadNews,
  };
};
