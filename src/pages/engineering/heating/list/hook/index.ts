import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetHeatingList } from '@features/engineering';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useList = () => {
  const { t } = useTranslation('engineering');
  const { data, getData, isLoading, total } = useGetHeatingList();
  const [isAccident, setIsAccident] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [filters, setFilters] = useState<{
    street?: number;
    building?: number;
  }>({
    street: undefined,
    building: undefined,
  });

  const handleGetData = useCallback(() => {
    getData({
      page,
      perPage,
      building_id: filters.building,
      street_id: filters.street,
      is_accident: isAccident || undefined,
    });
  }, [filters, getData, isAccident, page, perPage]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGetData();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [handleGetData]);

  return {
    data,
    isLoading,
    total,
    handleSetPage,
    handleSetPerPage,
    setFilters,
    setIsAccident,
    t,
    isAccident,
    page,
    perPage,
  };
};
