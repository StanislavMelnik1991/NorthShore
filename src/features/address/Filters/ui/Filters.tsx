import { AddressSelect, ISelectOption } from '@entities/components';
import { useSecurityFilters } from '../hook';

interface Config<T> {
  street?: T;
  building?: T;
  entrance?: T;
  apartment?: T;
}

interface Props {
  className?: string;
  showLabel?: boolean;
  showApartment?: boolean;
  errors?: Config<string>;
  initialValues?: Config<ISelectOption>;
  setFilters: (val: Config<number>) => void;
}

export const AddressFilters = ({
  className,
  setFilters,
  showLabel,
  errors,
  initialValues,
  showApartment,
}: Props) => {
  const {
    isStreetsLoading,
    streets,
    handleChangeStreet,
    buildings,
    isBuildingsLoading,
    handleBuildingChange,
    entrances,
    handleEntranceChange,
    isEntrancesLoading,
    activeBuilding,
    activeEntrance,
    activeStreet,
    activeApartment,
    apartment,
    handleApartmentChange,
    isApartmentsLoading,
  } = useSecurityFilters({
    setFilters,
    initial: initialValues,
    showApartment,
  });

  return (
    <AddressSelect
      showApartment={showApartment}
      loading={{
        building: isBuildingsLoading,
        entrance: isEntrancesLoading,
        street: isStreetsLoading,
        apartment: isApartmentsLoading,
      }}
      onChange={{
        building: handleBuildingChange,
        entrance: handleEntranceChange,
        street: handleChangeStreet,
        apartment: handleApartmentChange,
      }}
      options={{
        building: buildings,
        entrance: entrances,
        street: streets,
        apartment: apartment,
      }}
      values={{
        building: activeBuilding,
        entrance: activeEntrance,
        street: activeStreet,
        apartment: activeApartment,
      }}
      errors={errors}
      showLabel={showLabel}
      className={className}
    />
  );
};
