import { useTranslation } from 'react-i18next';
import { LangSelection } from '@widgets/langSection';
import { TableFilter } from '@widgets/Table';
import { Text } from '@shared/ui';
import { ConfigItemType } from '@shared/ui/Table';

interface LangsWrapper<T> {
  lang: T;
}

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  value: LangsWrapper<Options | null>;
  onChange: LangsWrapper<(val: Options | null) => void>;
}

export const useTableHeader: (props: Props) => Array<ConfigItemType> = ({
  onChange,
  value,
}) => {
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
      name: 'account',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.account')}
        </Text>
      ),
      width: 129,
    },
    {
      name: 'name',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.fullName')}
        </Text>
      ),
    },
    {
      name: 'phone_number',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.phone_number')}
        </Text>
      ),
      width: 175,
    },
    {
      name: 'objects',
      label: (
        <Text fontWeight="regular" variant="body14">
          {t('header.objects')}
        </Text>
      ),
    },
    {
      name: 'lang',
      label: (
        <TableFilter
          label={t('header.lang')}
          isActive={!!value.lang}
          filter={<LangSelection onChange={onChange.lang} value={value.lang} />}
        />
      ),
      width: 230,
    },
    {
      name: 'controls',
      width: 52,
    },
  ];
};
