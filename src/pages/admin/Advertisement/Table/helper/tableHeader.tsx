import { useTranslation } from 'react-i18next';
import { TableFilter } from '@widgets/Table';
import { StyledRangeDatePicker } from '@entities/components';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface Props {
  from: Date | null;
  to: Date | null;
  onDateChange: (val: [Date | null, Date | null]) => void;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  from,
  onDateChange,
  to,
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
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.title')}
        </Text>
      ),
    },
    {
      name: 'company',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.company')}
        </Text>
      ),
    },
    {
      name: 'link',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.link')}
        </Text>
      ),
    },
    {
      name: 'period',
      label: (
        <TableFilter
          label={t('header.period')}
          isActive={!!to}
          popupPosition={{ left: '-110%' }}
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
      name: 'controls',
      width: 52,
    },
  ];
};
