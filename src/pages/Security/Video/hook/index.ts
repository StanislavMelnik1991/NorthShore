import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCamerasList } from '@features/security/cameras';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useSecurityVideoPage = () => {
  const { t } = useTranslation('security');
  const { data, getData, isLoading, total } = useCamerasList();
  const [page, setPage] = useState<number>(1);
  const [streetId, setStreetId] = useState<number>();
  const [buildingId, setBuildingId] = useState<number>();
  const [entranceId, setEntranceId] = useState<number>();
  const [isFaulty, setIsFaulty] = useState(false);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);

  useEffect(() => {
    getData({
      page,
      perPage,
      street_id: streetId,
      building_id: buildingId,
      entrance_id: entranceId,
      is_faulty: isFaulty ? 1 : undefined,
    });
  }, [buildingId, entranceId, getData, isFaulty, page, perPage, streetId]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);
  return {
    setStreetId,
    setHomeId: setBuildingId,
    setEntranceId,
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
