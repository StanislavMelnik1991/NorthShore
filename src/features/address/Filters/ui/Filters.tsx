import { AddressSelect, ISelectOption } from '@entities/components';
import { useSecurityFilters } from '../hook';

interface Props {
  className?: string;
  showLabel?: boolean;
  errors?: {
    street?: string;
    building?: string;
    entrance?: string;
  };
  initialValues?: {
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  };
  setFilters: (val: {
    street_id?: number;
    building_id?: number;
    entrance_id?: number;
  }) => void;
}

export const AddressFilters = ({
  className,
  setFilters,
  showLabel,
  errors,
  initialValues,
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
  } = useSecurityFilters({
    setFilters,
    initial: initialValues,
  });

  return (
    <AddressSelect
      loading={{
        building: isBuildingsLoading,
        entrance: isEntrancesLoading,
        street: isStreetsLoading,
      }}
      onChange={{
        building: handleBuildingChange,
        entrance: handleEntranceChange,
        street: handleChangeStreet,
      }}
      options={{
        building: buildings,
        entrance: entrances,
        street: streets,
      }}
      values={{
        building: activeBuilding,
        entrance: activeEntrance,
        street: activeStreet,
      }}
      errors={errors}
      showLabel={showLabel}
      className={className}
    />
  );
};
