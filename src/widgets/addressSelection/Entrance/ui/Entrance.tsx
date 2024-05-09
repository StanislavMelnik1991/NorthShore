import { ISelectOption, TableSelect } from '@entities/components';
import { useEntrance } from '../hook';

interface Props {
  className?: string;
  value?: ISelectOption | null;
  onChange: (street: ISelectOption) => void;
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
