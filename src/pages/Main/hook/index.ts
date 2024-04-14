import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetUserNewsList } from "@features/news";
import { INews, INewsFilter, INewsSort, ListParams } from "@entities/types";
import { INITIAL_PER_PAGE, LanguageEnum } from "@shared/constants";

export const useMainPage = () => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total } = useGetUserNewsList();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Array<INews>>([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const params: ListParams<INewsSort, INewsFilter> = {
      page,
      perPage: INITIAL_PER_PAGE,
      filter: {
        status: 1,
      },
      sort: {
        created_at: "asc",
      },
    };
    getData(params).then((val) => {
      setData(val || []);
    });
  }, [getData, page]);
  return {
    isLoading,
    data,
    setPage,
    t,
    lang: i18n.language as LanguageEnum,
    slide,
    total,
    setSlide,
  };
};
