import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews, ListParams } from "@entities/types";
import { INITIAL_PER_PAGE, getRouteCreateEvent } from "@shared/constants";
import { SortOrder } from "@shared/types";

interface INewsFilter {
  is_draft: 0 | 1;
}

type INewsSort = { created_at: SortOrder } | { status: SortOrder };

export const useNewsList = () => {
  const { t } = useTranslation("events");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [data, setData] = useState<Array<INews>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debounced] = useDebounce(search, 500);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetData = useCallback(async () => {
    setIsLoading(true);
    const params: ListParams<INewsSort, INewsFilter> = {
      page,
      perPage,
      searchValue: debounced,
      filter: {
        is_draft: 1,
      },
      sort: {
        created_at: "asc",
      },
    };
    // ToDo: from server
    setTotal(100);
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<Array<INews>>>("/news", { params });
      setData(data);
    } catch (error) {
      toast.error(t("toast.listError"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [debounced, page, perPage, t]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(getRouteCreateEvent());
  }, [navigate]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  return {
    location,
    data,
    handleCreateClick,
    search,
    setSearch,
    isLoading,
    page,
    setPage: handleSetPage,
    perPage,
    setPerPage,
    total,
    t,
  };
};
