import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui/Table';

export const useTableConfig: () => Array<ConfigItemType> = () => {
  const { t } = useTranslation('news');
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
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.title')}
        </Text>
      ),
      width: 215,
    },
    {
      name: 'text',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.text')}
        </Text>
      ),
    },
    {
      name: 'date',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('table.date')}
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
