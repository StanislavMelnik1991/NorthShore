import classNames from 'classnames';
import { StyledSelect } from '@entities/components';
import { Text } from '@shared/ui';
import { useUserLanguage } from '../hook';
import styles from './Language.module.scss';

interface Props {
  className?: string;
}

export const UserLanguage = ({ className }: Props) => {
  const { t, activeLanguage, options, handleChangeLanguage } =
    useUserLanguage();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.label}>
        <Text variant="body14" fontWeight="regular" className={styles.dark}>
          {t('blocks.titles.language')}
        </Text>
        <Text variant="body16" fontWeight="regular">
          {t('blocks.descriptions.language')}
        </Text>
      </div>
      <StyledSelect
        className={styles.select}
        onChange={handleChangeLanguage}
        value={activeLanguage}
        options={options}
        isClearable={false}
      />
    </div>
  );
};
