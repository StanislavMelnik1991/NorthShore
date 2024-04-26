import { useCallback, useEffect, useState } from 'react';
import { ISelectOption } from '@entities/components';
import { useBuildingsList, useEntranceList, useStreetsList } from '../../';

interface Props {
  setFilters: (val: {
    street_id?: number;
    building_id?: number;
    entrance_id?: number;
  }) => void;
  initial?: {
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  };
}

export const useSecurityFilters = ({ setFilters, initial }: Props) => {
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

  const [activeStreet, setActiveStreet] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [activeBuilding, setActiveBuilding] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [activeEntrance, setActiveEntrance] = useState<{
    value: number;
    label: string;
  } | null>(null);

  useEffect(() => {
    getStreets().then(() => {
      if (initial) {
        if (initial.street) {
          getBuildings(initial.street.value);
          setActiveStreet(initial.street);
        }
        if (initial.building) {
          getEntrances(initial.building.value);
          setActiveBuilding(initial.building);
        }
        if (initial.entrance) {
          setActiveEntrance(initial.entrance);
        }
      }
    });
  }, [getBuildings, getEntrances, getStreets, initial]);

  const handleChangeStreet = useCallback(
    (street: unknown) => {
      clearEntrances();
      setActiveStreet(street as { value: number; label: string });
      setActiveEntrance(null);
      setActiveBuilding(null);
      if (street) {
        const { value } = street as { value: number; label: string };
        setFilters({ street_id: value });
        getBuildings(value);
      } else {
        setFilters({});
        clearBuildings();
      }
    },
    [clearBuildings, clearEntrances, getBuildings, setFilters],
  );

  const handleBuildingChange = useCallback(
    (building: unknown) => {
      setActiveBuilding(building as { value: number; label: string });
      setActiveEntrance(null);
      if (building) {
        const { value } = building as { value: number; label: string };
        setFilters({ building_id: value });
        getEntrances(value);
      } else {
        setFilters({});
        clearEntrances();
      }
    },
    [clearEntrances, getEntrances, setFilters],
  );
  const handleEntranceChange = useCallback(
    (entrance: unknown) => {
      setActiveEntrance(entrance as { value: number; label: string });
      if (entrance) {
        const { value } = entrance as { value: number; label: string };
        setFilters({ entrance_id: value });
      } else {
        setFilters({});
      }
    },
    [setFilters],
  );

  return {
    streets: streets.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    }),
    buildings: buildings.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    }),
    entrances: entrances.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    }),
    handleChangeStreet,
    handleBuildingChange,
    handleEntranceChange,
    isStreetsLoading,
    isBuildingsLoading,
    isEntrancesLoading,
    activeBuilding,
    activeEntrance,
    activeStreet,
  };
};
