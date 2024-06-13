import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui/Table';

export const useTableNotificationsHeader: () => Array<ConfigItemType> = () => {
  const { t } = useTranslation('table');
  return [
    {
      name: 'id',
      label: (
        <Text fontWeight="regular" variant="body14">
          {'№'}
        </Text>
      ),
      width: 92,
    },
    {
      name: 'disp_date',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.disp_date')}
        </Text>
      ),
      width: 176,
    },
    {
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.title')}
        </Text>
      ),
      width: 270,
    },
    {
      name: 'body',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.notif_text')}
        </Text>
      ),
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
