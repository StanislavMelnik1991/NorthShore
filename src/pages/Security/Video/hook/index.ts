import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCamerasList } from '@features/security/cameras';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useSecurityVideoPage = () => {
  const { t } = useTranslation('security');
  const { data, getData, isLoading, total } = useCamerasList();
  const [page, setPage] = useState<number>(1);
  const [isFaulty, setIsFaulty] = useState(false);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [filters, setFilters] = useState<{
    street_id?: number;
    building_id?: number;
    entrance_id?: number;
  }>({
    street_id: undefined,
    building_id: undefined,
    entrance_id: undefined,
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
  return {
    setFilters,
    isFaulty,
    setIsFaulty,
    t,
    data,
    isLoading,
    setPage: handleSetPage,
    total,
    setPerPage,
    perPage,
  };
};
