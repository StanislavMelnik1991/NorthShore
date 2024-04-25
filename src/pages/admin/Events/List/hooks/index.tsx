import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useGetEventsList } from '@features/Admin';
import { INews, INewsFilter, INewsSort, ListParams } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  INITIAL_PER_PAGE,
  NewsStatusEnum,
} from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  sort: INewsSort;
  filter: INewsFilter;
}

export const useEventsList = () => {
  const { t } = useTranslation('events');
  const { getData } = useGetEventsList();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [data, setData] = useState<Array<INews>>([]);
  const [status, setStatus] = useState<keyof typeof NewsStatusEnum>();
  const [isLoading, setIsLoading] = useState(true);
  const [debounced] = useDebounce(search, 500);
  const navigate = useNavigate();

  const handleGetData = useCallback(async () => {
    setIsLoading(true);
    const params: Params = {
      page,
      perPage,
      searchValue: debounced,
      filter: {
        status,
      },
      sort: {
        created_at: 'asc',
      },
    };
    setTotal(100);
    const news = await getData(params);
    setIsLoading(false);
    if (news) {
      setData(news);
    } else {
      navigate(-1);
    }
  }, [debounced, getData, navigate, page, perPage, status]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.CREATE_EVENT]());
  }, [navigate]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleToggleStatusFilter = useCallback(() => {
    setStatus((val) => (val ? undefined : 2));
  }, []);

  const tableHeader = useTableHeader();
  const tableData = useTableRows(data);

  return {
    handleCreateClick,
    search,
    setSearch,
    total,
    setPage: handleSetPage,
    perPage,
    setPerPage,
    isLoading,
    status,
    toggleStatusFilter: handleToggleStatusFilter,
    t,
    tableData,
    tableHeader,
  };
};
