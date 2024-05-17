import { useTranslation } from 'react-i18next';
import { TableFilter } from '@widgets/Table';
import {
  ISelectOption,
  StyledRangeDatePicker,
  TableSelect,
} from '@entities/components';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface Filters<T> {
  status: T;
  type: T;
  nature: T;
}

interface Props {
  value: Filters<ISelectOption | null>;
  onChange: Filters<(val: ISelectOption | null) => void>;
  options: Partial<Filters<ISelectOption[] | undefined>>;
  loading: Filters<boolean | undefined>;
  from: Date | null;
  to: Date | null;
  onDateChange: (val: [Date | null, Date | null]) => void;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  from,
  onChange,
  to,
  loading,
  onDateChange,
  options,
  value,
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
          isActive={!!value.status}
          filter={
            <TableSelect
              isLoading={loading.status}
              value={value.status}
              placeholder={t('controls.find')}
              onChange={(val) => {
                onChange.status(val as ISelectOption);
              }}
              options={options.status}
            />
          }
        />
      ),
    },
    {
      name: 'period',
      label: (
        <TableFilter
          label={t('header.period')}
          isActive={!!to}
          filter={
            <StyledRangeDatePicker
              startDate={from}
              endDate={to}
              onChange={onDateChange}
            />
          }
        />
      ),
      width: 135,
    },
    {
      name: 'type',
      label: (
        <TableFilter
          label={t('header.type')}
          isActive={!!value.type}
          filter={
            <TableSelect
              isLoading={loading.type}
              value={value.type}
              placeholder={t('controls.find')}
              onChange={(val) => {
                onChange.type(val as ISelectOption);
              }}
              options={options.type}
            />
          }
        />
      ),
    },
    {
      name: 'nature',
      label: (
        <TableFilter
          label={t('header.nature')}
          isActive={!!value.nature}
          filter={
            <TableSelect
              isLoading={loading.nature}
              value={value.nature}
              placeholder={t('controls.find')}
              onChange={(val) => {
                onChange.nature(val as ISelectOption);
              }}
              options={options.nature}
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
      name: 'responsible',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.responsible')}
        </Text>
      ),
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
