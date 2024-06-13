import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetResidentsList } from '@features/Admin';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

interface Options {
  value: string | number;
  label: string;
}

export const useResidentsList = () => {
  const { t } = useTranslation('residents');
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    debounced,
    search,
    setSearch,
  } = usePagination();
  const { getData, isLoading, total, data, totalUsers } = useGetResidentsList();
  const [lang, setActiveLang] = useState<Options | null>(null);
  const [open, setOpen] = useState(false);
  const [popUpId, setPopUpId] = useState<string>();
  const [filters, setFilters] = useState<{
    street?: number;
    building?: number;
    entrance?: number;
    apartment?: number;
  }>({
    street: undefined,
    building: undefined,
    entrance: undefined,
    apartment: undefined,
  });

  const handleGetData = useCallback(async () => {
    const params: ListParams = {
      page,
      perPage,
      searchValue: debounced,
    };
    getData(params);
  }, [debounced, getData, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData, lang, filters, search]);

  const handleSelectLang = useCallback((val: Options | null) => {
    setActiveLang(val);
  }, []);

  const tableHeader = useTableHeader({
    value: { lang },
    onChange: {
      lang: handleSelectLang,
    },
  });

  const tableData = useTableRows(data, setOpen, setPopUpId);

  return {
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    perPage,
    setPerPage: handleSetPerPage,
    total,
    t,
    tableHeader,
    tableData,
    setFilters,
    open,
    setOpen,
    popUpId,
    setPopUpId,
    totalUsers,
  };
};
