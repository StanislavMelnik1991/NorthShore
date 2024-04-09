import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews } from "@entities/types";
import { INITIAL_PER_PAGE, getRouteCreateNews } from "@shared/constants";

export const useNewsList = () => {
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
    // ToDo: from server
    setTotal(100);
    try {
      const {
        data: { data },
      } = await axiosApi.get<BaseResponse<Array<INews>>>("/news");
      setData(data);
    } catch (error) {
      toast.error("Не удалось получить список новостей");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(getRouteCreateNews());
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
  };
};
