import { TableSelect } from '@entities/components';
import { useStreet } from '../hook';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  className?: string;
  value?: Options | null;
  onChange: (street: Options) => void;
}

export const StreetSelection = ({ value, onChange }: Props) => {
  const { t, data, isLoading, handleChange } = useStreet({ onChange });
  return (
    <TableSelect
      value={value}
      isLoading={isLoading}
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
