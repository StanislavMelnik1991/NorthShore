import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserNotificationsList } from '@features/Admin';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
}

export const useMeetingsList = () => {
  const { getData, isLoading, total, data } = useGetUserNotificationsList();
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    debounced,
    search,
    setSearch,
  } = usePagination();
  const { t } = useTranslation('notifications');
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced,
      from: to && from ? from : undefined,
      to: to || undefined,
    };
    getData(params);
  }, [debounced, from, getData, page, perPage, to]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

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
