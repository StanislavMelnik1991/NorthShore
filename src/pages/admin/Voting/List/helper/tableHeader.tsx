import { useTranslation } from 'react-i18next';
import { TableFilter } from '@widgets/Table';
import {
  ISelectOption,
  StyledRangeDatePicker,
  TableSelect,
} from '@entities/components';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface Props {
  from: Date | null;
  to: Date | null;
  onChange: (val: [Date | null, Date | null]) => void;
  onSelect: (val: ISelectOption | null) => void;
  options: ISelectOption[];
  selected: ISelectOption | null;
  isSelectLoading?: boolean;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  from,
  onChange,
  to,
  onSelect,
  options,
  selected,
  isSelectLoading,
}) => {
  const { t } = useTranslation('table');
  return [
    {
      name: 'id',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.index')}
        </Text>
      ),
      width: 92,
    },
    {
      name: 'status',
      label: (
        <TableFilter
          label={t('header.status')}
          isActive={!!selected}
          filter={
            <TableSelect
              isLoading={isSelectLoading}
              value={selected}
              placeholder={t('controls.find')}
              onChange={(val) => onSelect(val as ISelectOption)}
              options={options}
            />
          }
        />
      ),
    },
    {
      name: 'deadline',
      label: (
        <TableFilter
          label={t('header.deadline')}
          isActive={!!to}
          filter={
            <StyledRangeDatePicker
              startDate={from}
              endDate={to}
              onChange={onChange}
            />
          }
        />
      ),
    },
    {
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.title')}
        </Text>
      ),
    },
    {
      name: 'group',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.recipient_groups')}
        </Text>
      ),
    },
    {
      name: 'showResults',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.showResults')}
        </Text>
      ),
      width: 126,
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
