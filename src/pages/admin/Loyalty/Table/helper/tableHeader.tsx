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
      name: 'discount',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.discount')}
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
