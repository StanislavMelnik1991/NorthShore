import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCamerasList } from '@features/security';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useSecurityVideoPage = () => {
  const { t } = useTranslation('security');
  const { data, getData, isLoading, total } = useCamerasList();
  const [page, setPage] = useState<number>(1);
  const [isFaulty, setIsFaulty] = useState(false);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [filters, setFilters] = useState<{
    street?: number;
    building?: number;
    entrance?: number;
  }>({
    street: undefined,
    building: undefined,
    entrance: undefined,
  });

  useEffect(() => {
    getData({
      page,
      perPage,
      ...filters,
      is_faulty: isFaulty ? 1 : undefined,
    });
  }, [filters, getData, isFaulty, page, perPage]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

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
