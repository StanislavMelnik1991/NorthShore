import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserNewsList } from '@features/news';
import { INews, INewsFilter, INewsSort, ListParams } from '@entities/types';
import { INITIAL_PER_PAGE, LanguageEnum } from '@shared/constants';

interface Props {
  defaultSlide?: number;
}

export const useNewsSlider = ({ defaultSlide = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total } = useGetUserNewsList();
  // const [newsPage, setNewsPage] = useState(1);
  const [news, setNews] = useState<Array<INews>>([]);
  const [slide, setSlide] = useState(defaultSlide);

  interface Params extends ListParams {
    sort: INewsSort;
    filter: INewsFilter;
  }

  useEffect(() => {
    const newsParams: Params = {
      page: 1,
      perPage: INITIAL_PER_PAGE,
      filter: {
        status: 1,
      },
      sort: {
        created_at: 'asc',
      },
    };
    getData(newsParams).then((val) => {
      setNews(val || []);
    });
  }, [getData]);
  return {
    news,
    t,
    lang: i18n.language as LanguageEnum,
    slide,
    setSlide,
    isLoading,
    total,
  };
};
