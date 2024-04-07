import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { NewsType } from "@entities/types";
import { getRouteCreateNews } from "@shared/constants";
import { mockNews } from "../constants";

export const useNewsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [data, setData] = useState<Array<NewsType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debounced] = useDebounce(search, 500);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetData = useCallback(() => {
    setIsLoading(true);
    const newData = mockNews;
    setData(newData);
    setIsLoading(false);
    // ToDo: update when complete fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(getRouteCreateNews());
  }, [navigate]);
  return {
    location,
    data,
    handleCreateClick,
    search,
    setSearch,
    isLoading,
    page,
    setPage,
    perPage,
    setPerPage,
  };
};
