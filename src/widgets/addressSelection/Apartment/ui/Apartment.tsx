import { TableSelect } from '@entities/components';
import { useApartment } from '../hook';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  className?: string;
  value?: Options | null;
  onChange: (street: Options) => void;
  entranceId?: number | string;
}

export const ApartmentSelection = ({ value, onChange, entranceId }: Props) => {
  const { t, data, isLoading, handleChange } = useApartment({
    onChange,
    entranceId,
  });
  return (
    <TableSelect
      value={value}
      isLoading={isLoading}
      isDisabled={!entranceId || isLoading}
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
