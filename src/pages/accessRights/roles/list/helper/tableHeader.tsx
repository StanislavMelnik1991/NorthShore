import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

export const useTableHeader: () => Array<ConfigItemType> = () => {
  const { t } = useTranslation('table');
  return [
    {
      name: 'roles',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.roles')}
        </Text>
      ),
      width: 230,
    },
    {
      name: 'description',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.rolesDescription')}
        </Text>
      ),
      width: 350,
    },
    {
      name: 'staff',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.staff')}
        </Text>
      ),
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
