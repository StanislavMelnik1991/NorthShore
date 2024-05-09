import { ISelectOption, TableSelect } from '@entities/components';
import { useStreet } from '../hook';

interface Props {
  className?: string;
  value?: ISelectOption | null;
  onChange: (street: ISelectOption) => void;
}

export const StreetSelection = ({ value, onChange }: Props) => {
  const { t, data, isLoading, handleChange } = useStreet({ onChange });
  return (
    <TableSelect
      value={value}
      isLoading={isLoading}
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
