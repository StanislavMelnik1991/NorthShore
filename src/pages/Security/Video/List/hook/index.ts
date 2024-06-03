import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePagination } from '@features/pagination';
import { useCamerasList } from '@features/security';

export const useSecurityVideoPage = () => {
  const { t } = useTranslation('security');
  const { handleSetPage, handleSetPerPage, page, perPage } = usePagination();
  const { data, getData, isLoading, total } = useCamerasList();
  const [isFaulty, setIsFaulty] = useState(false);
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
      entrance_id: filters.entrance,
      street_id: filters.street,
      is_faulty: isFaulty ? 1 : undefined,
    });
  }, [
    filters.building,
    filters.entrance,
    filters.street,
    getData,
    isFaulty,
    page,
    perPage,
  ]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return {
    setFilters,
    isFaulty,
    setIsFaulty,
    t,
    data,
    isLoading,
    setPage: handleSetPage,
    total,
    setPerPage: handleSetPerPage,
    perPage,
    page,
  };
};
