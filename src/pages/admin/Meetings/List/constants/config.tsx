import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui/Table';

export const useTableConfig: () => Array<ConfigItemType> = () => {
  const { t } = useTranslation('events');
  return [
    {
      name: 'id',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.index')}
        </Text>
      ),
      width: 92,
    },
    {
      name: 'status',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.status')}
        </Text>
      ),
      width: 121,
    },
    {
      name: 'date',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.date')}
        </Text>
      ),
      width: 176,
    },
    {
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.title')}
        </Text>
      ),
    },
    {
      name: 'published',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.published')}
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
