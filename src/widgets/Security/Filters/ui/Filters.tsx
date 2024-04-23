import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { StyledSelect } from '@entities/components';
import { CheckBox } from '@shared/ui';
import { useSecurityFilters } from '../hook';
import styles from './Filters.module.scss';

interface Props {
  className?: string;
  isFaulty: boolean;
  setIsFaulty: (val: boolean) => void;
  setFilters: Dispatch<
    SetStateAction<{
      street_id?: number;
      building_id?: number;
      entrance_id?: number;
    }>
  >;
}

export const SecurityFilters = ({
  className,
  setFilters,
  isFaulty,
  setIsFaulty,
}: Props) => {
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
      <CheckBox
        value={isFaulty}
        onChange={(val) => {
          setIsFaulty(val);
        }}
        label={'Показать неисправные'}
      />
    </div>
  );
};
