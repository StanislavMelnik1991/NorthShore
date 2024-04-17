import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Tab } from '@entities/components';
import { ACCEPTED_LANGUAGES, LanguageEnum } from '@shared/constants';
import { Text } from '@shared/ui';
import { ContentWidget } from '../../singleLanguage';
import styles from './ContentWithLanguageSelection.module.scss';

interface Props {
  className?: string;
  config: Record<
    LanguageEnum,
    {
      created_at?: Date;
      title?: string;
      html?: string;
      date?: Date;
      link?: string;
    }
  >;
}

export const ContentWithLanguageSelection = ({ className, config }: Props) => {
  const { t } = useTranslation('content');
  const labels = ACCEPTED_LANGUAGES.map((lang) => {
    return (
      <Text variant="body16" fontWeight="medium" key={`tab-label-${lang}`}>
        {t(`versions.${lang}`)}
      </Text>
    );
  });

  const tabs = ACCEPTED_LANGUAGES.map((lang) => {
    return (
      <ContentWidget
        className={styles.content}
        {...config[lang]}
        key={`tab-content-${lang}`}
      />
    );
  });

  return (
    <Tab
      labels={labels}
      tabs={tabs}
      className={classNames(styles.wrapper, className)}
    />
  );
};
