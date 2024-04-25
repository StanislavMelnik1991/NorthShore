import { TableSelect } from '@entities/components';
import { useBuilding } from '../hook';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  className?: string;
  value?: Options | null;
  onChange: (street: Options) => void;
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
      placeholder={t('search')}
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
