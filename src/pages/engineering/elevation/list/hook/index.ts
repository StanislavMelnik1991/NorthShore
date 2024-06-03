import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetIElevatorsList } from '@features/engineering';
import { usePagination } from '@features/pagination';

export const useList = () => {
  const { t } = useTranslation('engineering');
  const { handleSetPage, handleSetPerPage, page, perPage } = usePagination();
  const { data, getData, isLoading, total } = useGetIElevatorsList();
  const [isAccident, setIsAccident] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    street?: number;
    building?: number;
    entrance?: number;
  }>({
    street: undefined,
    building: undefined,
    entrance: undefined,
  });

  const handleGetData = useCallback(() => {
    getData({
      page,
      perPage,
      building_id: filters.building,
      street_id: filters.street,
      entrance_id: filters.entrance,
      is_accident: isAccident || undefined,
    });
  }, [filters, getData, isAccident, page, perPage]);

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
