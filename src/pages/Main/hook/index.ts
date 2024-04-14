import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetUserEventsList } from "@features/events";
import { useGetUserNewsList } from "@features/news";
import { INews, INewsFilter, INewsSort, ListParams } from "@entities/types";
import { INITIAL_PER_PAGE, LanguageEnum } from "@shared/constants";

export const useMainPage = () => {
  const { t, i18n } = useTranslation();
  const {
    getData: getNewsData,
    isLoading: isNewsLoading,
    total: newsTotal,
  } = useGetUserNewsList();
  const {
    getData: getEventsData,
    isLoading: isEventsLoading,
    total: eventsTotal,
  } = useGetUserEventsList();
  const [newsPage, setNewsPage] = useState(1);
  const [eventsPage, setEventsPage] = useState(1);
  const [news, setNews] = useState<Array<INews>>([]);
  const [events, setEvents] = useState<Array<INews>>([]);
  const [newsSlide, setNewsSlide] = useState(0);
  const [eventsSlide, setEventsSlide] = useState(0);

  useEffect(() => {
    const newsParams: ListParams<INewsSort, INewsFilter> = {
      page: newsPage,
      perPage: INITIAL_PER_PAGE,
      filter: {
        status: 1,
      },
      sort: {
        created_at: "asc",
      },
    };
    const eventsParams: ListParams<INewsSort, INewsFilter> = {
      page: eventsPage,
      perPage: INITIAL_PER_PAGE,
      filter: {
        status: 1,
      },
      sort: {
        created_at: "asc",
      },
    };
    getNewsData(newsParams).then((val) => {
      setNews(val || []);
    });
    getEventsData(eventsParams).then((val) => {
      setEvents(val || []);
    });
  }, [eventsPage, getEventsData, getNewsData, newsPage]);
  return {
    isNewsLoading,
    news,
    setNewsPage,
    t,
    lang: i18n.language as LanguageEnum,
    newsSlide,
    newsTotal,
    setNewsSlide,
    eventsTotal,
    eventsSlide,
    setEventsSlide,
    setEventsPage,
    isEventsLoading,
    events,
  };
};
