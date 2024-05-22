import { useTranslation } from 'react-i18next';
import { TableSelect } from '@entities/components';
import { useLang } from '../hook';

interface Options {
  value: string | number;
  label: string;
}

interface Props {
  className?: string;
  value?: Options | null;
  onChange: (lang: Options) => void;
}

export const LangSelection = ({ value, onChange }: Props) => {
  const { t } = useTranslation('residents');
  const { handleChange } = useLang({ onChange });
  return (
    <TableSelect
      value={value}
      placeholder={t('search')}
      onChange={handleChange}
      options={[
        { value: 'en', label: t('langs.en') },
        { value: 'ru', label: t('langs.ru') },
      ].map(({ label, value }) => {
        return {
          value,
          label,
        };
      })}
    />
  );
};
