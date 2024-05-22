import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { useGetResidentsList } from '@features/Admin';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Options {
  value: string | number;
  label: string;
}

export const useResidentsList = () => {
  const { t } = useTranslation('residents');
  const { getData, isLoading, total, data } = useGetResidentsList();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [lang, setActiveLang] = useState<Options | null>(null);
  const [debounced] = useDebounce(search, 500);
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

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

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
    setPerPage,
    total,
    t,
    tableHeader,
    tableData,
    setFilters,
    open,
    setOpen,
    popUpId,
    setPopUpId,
  };
};
