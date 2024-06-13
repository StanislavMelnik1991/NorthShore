import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui/Table';

export const useTableRequestsHeader: () => Array<ConfigItemType> = () => {
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
      name: 'status',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.status')}
        </Text>
      ),
      width: 230,
    },
    {
      name: 'date',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.date')}
        </Text>
      ),
      width: 106,
    },
    {
      name: 'topic',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.topic')}
        </Text>
      ),
      width: 152,
    },
    {
      name: 'title',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.title')}
        </Text>
      ),
      width: 275,
    },
    {
      name: 'comment',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.comment')}
        </Text>
      ),
      width: 275,
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
