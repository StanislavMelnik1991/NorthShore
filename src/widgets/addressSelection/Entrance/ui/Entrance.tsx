import { TableSelect } from '@entities/components';
import { useEntrance } from '../hook';

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

export const EntranceSelection = ({ value, onChange, streetId }: Props) => {
  const { t, data, isLoading, handleChange } = useEntrance({
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
