import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useBuildingsList,
  useEntranceList,
  useStreetsList,
} from '@features/address';

interface Props {
  setStreetId: (val?: number) => void;
  setEntranceId: (val?: number) => void;
  setHomeId: (val?: number) => void;
}

export const useSecurityFilters = ({
  setStreetId,
  setEntranceId,
  setHomeId,
}: Props) => {
  const {
    data: streets,
    getData: getStreets,
    isLoading: isStreetsLoading,
  } = useStreetsList();
  const {
    data: buildings,
    getData: getBuildings,
    isLoading: isBuildingsLoading,
    clearData: clearBuildings,
  } = useBuildingsList();
  const {
    data: entrances,
    getData: getEntrances,
    isLoading: isEntrancesLoading,
    clearData: clearEntrances,
  } = useEntranceList();

  const { t } = useTranslation('security');
  const [activeBuilding, setActiveBuilding] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [activeEntrance, setActiveEntrance] = useState<{
    value: number;
    label: string;
  } | null>(null);

  useEffect(() => {
    getStreets();
  }, [getStreets]);

  const handleChangeStreet = useCallback(
    (street: { value: number; label: string } | null) => {
      clearEntrances();
      setActiveEntrance(null);
      setActiveBuilding(null);
      if (street) {
        setStreetId(street.value);
        getBuildings(street.value);
      } else {
        setStreetId();
        clearBuildings();
      }
    },
    [clearBuildings, clearEntrances, getBuildings, setStreetId],
  );

  const handleBuildingChange = useCallback(
    (building: { value: number; label: string } | null) => {
      setActiveBuilding(building);
      setActiveEntrance(null);
      setEntranceId();
      if (building) {
        setHomeId(building.value);
        getEntrances(building.value);
      } else {
        setHomeId();
        clearEntrances();
      }
    },
    [clearEntrances, getEntrances, setEntranceId, setHomeId],
  );
  const handleEntranceChange = useCallback(
    (entrance: { value: number; label: string } | null) => {
      setActiveEntrance(entrance);
      if (entrance) {
        setEntranceId(entrance.value);
      } else {
        setEntranceId();
      }
    },
    [setEntranceId],
  );

  return {
    t,
    streets,
    buildings,
    entrances,
    handleChangeStreet,
    handleBuildingChange,
    handleEntranceChange,
    isStreetsLoading,
    isBuildingsLoading,
    isEntrancesLoading,
    activeBuilding,
    activeEntrance,
  };
};
