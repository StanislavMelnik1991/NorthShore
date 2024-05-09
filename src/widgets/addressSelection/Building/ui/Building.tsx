import { ISelectOption, TableSelect } from '@entities/components';
import { useBuilding } from '../hook';

interface Props {
  className?: string;
  value?: ISelectOption | null;
  onChange: (street: ISelectOption) => void;
  streetId?: number | string;
}

export const BuildingSelection = ({ value, onChange, streetId }: Props) => {
  const { t, data, isLoading, handleChange } = useBuilding({
    onChange,
    streetId,
  });
  return (
    <TableSelect
      value={value}
      isLoading={isLoading}
      isDisabled={!streetId || isLoading}
      placeholder={t('controls.find')}
      onChange={handleChange}
      options={data.map(({ label, value }) => {
        return {
          value,
          label,
        };
      })}
    />
  );
};
