import { useTranslation } from 'react-i18next';
import { TableFilter } from '@widgets/Table';
import { StyledRangeDatePicker } from '@entities/components';
import { ConfigItemType } from '@shared/ui';
import { Text } from '@shared/ui';

interface Props {
  from: Date | null;
  to: Date | null;
  onChange: (val: [Date | null, Date | null]) => void;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  from,
  onChange,
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
      width: 90,
    },
    {
      name: 'sendDate',
      label: (
        <TableFilter
          label={t('header.sendDate')}
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
      width: 190,
    },
    {
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.title')}
        </Text>
      ),
      width: 290,
    },
    {
      name: 'recipient_groups',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.recipient_groups')}
        </Text>
      ),
    },
    {
      name: 'notification',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.notification')}
        </Text>
      ),
      width: 140,
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
