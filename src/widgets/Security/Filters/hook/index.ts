import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  useBuildingsList,
  useEntranceList,
  useStreetsList,
} from '@features/address';

interface Props {
  setFilters: Dispatch<
    SetStateAction<{
      street_id?: number;
      building_id?: number;
      entrance_id?: number;
    }>
  >;
}

export const useSecurityFilters = ({ setFilters }: Props) => {
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
        setFilters({ street_id: street.value });
        getBuildings(street.value);
      } else {
        setFilters({});
        clearBuildings();
      }
    },
    [clearBuildings, clearEntrances, getBuildings, setFilters],
  );

  const handleBuildingChange = useCallback(
    (building: { value: number; label: string } | null) => {
      setActiveBuilding(building);
      setActiveEntrance(null);
      if (building) {
        setFilters({ building_id: building.value });
        getEntrances(building.value);
      } else {
        setFilters({});
        clearEntrances();
      }
    },
    [clearEntrances, getEntrances, setFilters],
  );
  const handleEntranceChange = useCallback(
    (entrance: { value: number; label: string } | null) => {
      setActiveEntrance(entrance);
      if (entrance) {
        setFilters({ entrance_id: entrance.value });
      } else {
        setFilters({});
      }
    },
    [setFilters],
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
