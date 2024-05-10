import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { ACCEPTED_LANGUAGES, LanguageEnum } from '@shared/constants';
import { Text } from '@shared/ui';
import { Tab } from '../../../Tab';
import styles from './LanguageTab.module.scss';

interface Props {
  className?: string;
  tabs: Record<LanguageEnum, string | JSX.Element>;
  tabClassName?: string;
  action?: JSX.Element | false;
}

export const LanguageTab = ({
  className: className,
  tabs,
  tabClassName,
  action,
}: Props) => {
  const { t } = useTranslation('content');
  const labels = ACCEPTED_LANGUAGES.map((lang) => {
    return (
      <Text variant="body16" fontWeight="medium" key={`tab-label-${lang}`}>
        {t(`versions.${lang}`)}
      </Text>
    );
  });
  const localizedTabs = ACCEPTED_LANGUAGES.map((lang) => {
    return tabs[lang];
  });

  return (
    <div className={classNames(styles.wrapper, className)}>
      <Tab labels={labels} tabs={localizedTabs} className={tabClassName} />
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
