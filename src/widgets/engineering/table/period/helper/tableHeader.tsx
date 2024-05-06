import { useTranslation } from 'react-i18next';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui';

interface Props {
  measures: string;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  measures,
}) => {
  const { t } = useTranslation('table');
  return [
    {
      name: 'date',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.readingDate')}
        </Text>
      ),
    },
    {
      name: 'consumption',
      label: (
        <Text fontWeight="regular" variant="body14">
          {`${t('header.absoluteConsumption')}, ${measures}`}
        </Text>
      ),
    },

    {
      name: 'delta',
      label: (
        <Text fontWeight="regular" variant="body14">
          {`${t('header.delta')}, ${measures}`}
        </Text>
      ),
    },
  ];
};
