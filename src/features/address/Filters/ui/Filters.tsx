import classNames from 'classnames';
import { StyledSelect } from '@entities/components';
import { useSecurityFilters } from '../hook';
import styles from './Filters.module.scss';

interface Props {
  className?: string;
  showLabel?: boolean;
  setFilters: (val: {
    street_id?: number;
    building_id?: number;
    entrance_id?: number;
  }) => void;
}

export const AddressFilters = ({ className, setFilters, showLabel }: Props) => {
  const {
    t,
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
  } = useSecurityFilters({
    setFilters,
  });

  return (
    <div className={classNames(styles.wrapper, className)}>
      <StyledSelect
        className={classNames(styles.select, styles.street)}
        isLoading={isStreetsLoading}
        label={showLabel ? t('editor.street.label') : undefined}
        placeholder={t('editor.street.placeholder')}
        onChange={(val) =>
          handleChangeStreet(val as { value: number; label: string } | null)
        }
        options={streets.map((el) => {
          return {
            value: el.id,
            label: el.name,
          };
        })}
      />
      <StyledSelect
        className={classNames(styles.select, styles.home)}
        isDisabled={!buildings.length}
        isLoading={isBuildingsLoading}
        value={activeBuilding}
        label={showLabel ? t('editor.building.label') : undefined}
        placeholder={t('editor.building.placeholder')}
        onChange={(val) =>
          handleBuildingChange(val as { value: number; label: string } | null)
        }
        options={buildings.map((el) => {
          return {
            value: el.id,
            label: el.name,
          };
        })}
      />
      <StyledSelect
        className={classNames(styles.select, styles.entrance)}
        isDisabled={!entrances.length}
        isLoading={isEntrancesLoading}
        value={activeEntrance}
        label={showLabel ? t('editor.entrance.label') : undefined}
        placeholder={t('editor.entrance.placeholder')}
        onChange={(val) =>
          handleEntranceChange(val as { value: number; label: string } | null)
        }
        options={entrances.map((el) => {
          return {
            value: el.id,
            label: el.name,
          };
        })}
      />
    </div>
  );
};
