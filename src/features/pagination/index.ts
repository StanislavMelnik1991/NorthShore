import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [debounced] = useDebounce(search, 500);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(
      ({ selected }) => {
        const perPage = searchParams.get('perPage') || String(INITIAL_PER_PAGE);
        const params: Partial<Record<keyof ListParams, string>> = {
          page: String(selected + 1),
          perPage,
        };
        if (debounced !== '') {
          params.searchValue = debounced;
        }
        setSearchParams(params);
      },
      [debounced, searchParams, setSearchParams],
    );

  const handleSetPerPage = useCallback(
    (val: number) => {
      const params: Partial<Record<keyof ListParams, string>> = {
        page: '1',
        perPage: String(val),
      };
      if (debounced !== '') {
        params.searchValue = debounced;
      }
      setSearchParams(params);
    },
    [debounced, setSearchParams],
  );

  useEffect(() => {
    const perPage = searchParams.get('perPage') || String(INITIAL_PER_PAGE);
    const page = searchParams.get('page') || '1';
    const params: Partial<Record<keyof ListParams, string>> = { page, perPage };
    if (debounced !== '') {
      setSearch(debounced);
      params.searchValue = debounced;
    }
    setSearchParams(params);
  }, [debounced, searchParams, setSearchParams]);

  return {
    perPage: Number(searchParams.get('perPage')) || INITIAL_PER_PAGE,
    page: Number(searchParams.get('page')) || 1,
    debounced,
    search,
    setSearch,
    handleSetPage,
    handleSetPerPage,
  };
};
