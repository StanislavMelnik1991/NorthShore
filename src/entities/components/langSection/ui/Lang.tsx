import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { useLang } from '../hook';
import styles from './Lang.module.scss';

interface Props {
  className?: string;
  value?: { value: 'en' | 'ru'; label: string } | null;
  onChange: (lang: { value: 'en' | 'ru'; label: string }) => void;
  options?: { value: 'en' | 'ru'; label: string }[];
}

export const LangSelection = ({ value, onChange, options }: Props) => {
  const { t } = useTranslation();
  const { handleChange } = useLang({ onChange });
  return (
    <Select
      classNames={{
        indicatorsContainer: () => {
          return styles.indicators;
        },
        valueContainer: () => {
          return styles.valueContainer;
        },
        control: () => {
          return styles.container;
        },
        menu: () => {
          return styles.menu;
        },
        option: (state) => {
          if (state.isSelected) {
            return styles.optionSelected;
          }
          if (state.isFocused) {
            return styles.optionFocused;
          }
          return styles.option;
        },
        input: () => {
          return styles.input;
        },
        placeholder: () => {
          return styles.placeholder;
        },
      }}
      inputId="select-input"
      value={value}
      placeholder={t('search')}
      onChange={handleChange}
      options={(
        options || [
          { value: 'en', label: t('langs.en') },
          { value: 'ru', label: t('langs.ru') },
        ]
      ).map(({ label, value }) => {
        return {
          value,
          label,
        };
      })}
    />
  );
};
