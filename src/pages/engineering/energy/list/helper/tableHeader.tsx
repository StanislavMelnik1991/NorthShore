import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

export const useTableHeader: () => Array<ConfigItemType> = () => {
  const { t } = useTranslation('table');
  return [
    {
      name: 'id',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.index')}
        </Text>
      ),
    },
    {
      name: 'type',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.type')}
        </Text>
      ),
      width: 100,
    },

    {
      name: 'address',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.address')}
        </Text>
      ),
      width: 400,
    },
    {
      name: 'state',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.state')}
        </Text>
      ),
    },
    {
      name: 'lastData',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.lastData')}
        </Text>
      ),
    },
    {
      name: 'lastUpdate',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.lastUpdate')}
        </Text>
      ),
    },
    {
      name: 'voltage',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.voltage')}
        </Text>
      ),
    },
    {
      name: 'chargingStatus',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.chargingStatus')}
        </Text>
      ),
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
