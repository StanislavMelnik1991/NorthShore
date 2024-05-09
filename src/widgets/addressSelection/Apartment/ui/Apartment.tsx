import { ISelectOption, TableSelect } from '@entities/components';
import { useApartment } from '../hook';

interface Props {
  className?: string;
  value?: ISelectOption | null;
  onChange: (street: ISelectOption) => void;
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
