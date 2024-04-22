import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserEventsList } from '@features/events';
import { INews, INewsFilter, INewsSort, ListParams } from '@entities/types';
import { INITIAL_PER_PAGE, LanguageEnum } from '@shared/constants';

interface Props {
  defaultSlide?: number;
}

interface Params extends ListParams {
  sort: INewsSort;
  filter: INewsFilter;
}

export const useEventsSlider = ({ defaultSlide = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total } = useGetUserEventsList();
  const [events, setEvents] = useState<Array<INews>>([]);
  const [slide, setSlide] = useState(defaultSlide);

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
      setEvents(val || []);
    });
  }, [getData]);
  return {
    events,
    t,
    lang: i18n.language as LanguageEnum,
    slide,
    setSlide,
    isLoading,
    total,
  };
};
