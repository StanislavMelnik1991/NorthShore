import { useCallback, useEffect, useState } from 'react';
import { ISelectOption } from '@entities/components';
import {
  useApartmentsList,
  useBuildingsList,
  useEntranceList,
  useStreetsList,
} from '../../';

interface Config<T> {
  street?: T;
  building?: T;
  entrance?: T;
  apartment?: T;
}

interface Props {
  setFilters: (val: Config<number>) => void;
  initial?: Config<ISelectOption>;
  showApartment?: boolean;
}

export const useSecurityFilters = ({
  setFilters,
  initial,
  showApartment,
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
  const {
    data: apartments,
    getData: getApartments,
    isLoading: isApartmentsLoading,
    clearData: clearApartments,
  } = useApartmentsList();

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
  const [activeApartment, setActiveApartment] = useState<{
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
          showApartment && getApartments(initial.entrance.value);
          setActiveEntrance(initial.entrance);
        }
        if (initial.apartment) {
          setActiveApartment(initial.apartment);
        }
      }
    });
  }, [
    getApartments,
    getBuildings,
    getEntrances,
    getStreets,
    initial,
    showApartment,
  ]);

  const handleChangeStreet = useCallback(
    (val: unknown) => {
      clearEntrances();
      setActiveStreet(val as { value: number; label: string });
      setActiveEntrance(null);
      setActiveBuilding(null);
      setActiveApartment(null);
      if (val) {
        const { value } = val as { value: number; label: string };
        setFilters({ street: value });
        getBuildings(value);
      } else {
        setFilters({});
        clearBuildings();
      }
    },
    [clearBuildings, clearEntrances, getBuildings, setFilters],
  );

  const handleBuildingChange = useCallback(
    (val: unknown) => {
      setActiveBuilding(val as { value: number; label: string });
      setActiveEntrance(null);
      setActiveApartment(null);
      if (val) {
        const { value } = val as { value: number; label: string };
        setFilters({ building: value });
        getEntrances(value);
      } else {
        setFilters({});
        clearEntrances();
      }
    },
    [clearEntrances, getEntrances, setFilters],
  );
  const handleEntranceChange = useCallback(
    (val: unknown) => {
      setActiveEntrance(val as { value: number; label: string });
      setActiveApartment(null);
      if (val) {
        const { value } = val as { value: number; label: string };
        setFilters({ entrance: value });
        showApartment && getApartments(value);
      } else {
        setFilters({});
        clearApartments();
      }
    },
    [clearApartments, getApartments, setFilters, showApartment],
  );

  const handleApartmentChange = useCallback(
    (val: unknown) => {
      setActiveApartment(val as { value: number; label: string });
      if (val) {
        const { value } = val as { value: number; label: string };
        setFilters({ apartment: value });
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
    apartment: apartments.map((el) => {
      return {
        value: el.id,
        label: el.name,
      };
    }),
    handleChangeStreet,
    handleBuildingChange,
    handleEntranceChange,
    handleApartmentChange,
    isStreetsLoading,
    isBuildingsLoading,
    isEntrancesLoading,
    isApartmentsLoading,
    activeBuilding,
    activeEntrance,
    activeStreet,
    activeApartment,
  };
};
