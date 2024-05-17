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
      width: 92,
    },
    {
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.title')}
        </Text>
      ),
      width: 370,
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
      name: 'date',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.date')}
        </Text>
      ),
      width: 107,
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
