import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { useGetUserNotificationsList } from '@features/Admin';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
}

export const useMeetingsList = () => {
  const { getData, isLoading, total, data } = useGetUserNotificationsList();
  const { t } = useTranslation('notifications');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [debounced] = useDebounce(search, 500);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced.length ? debounced : undefined,
      from: to && from ? from : undefined,
      to: to || undefined,
    };
    getData(params);
  }, [debounced, from, getData, page, perPage, to]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

  const handleChange = (val: [Date | null, Date | null]) => {
    setFrom(val?.[0] || null);
    setTo(val?.[1] || null);
  };

  const tableHeader = useTableHeader({
    from,
    to,
    onChange: handleChange,
  });
  const tableData = useTableRows(data);

  return {
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    perPage,
    setPerPage: handleSetPerPage,
    total,
    t,
    tableData,
    tableHeader,
    page,
  };
};
