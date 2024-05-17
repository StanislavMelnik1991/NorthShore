import classNames from 'classnames';
import { LanguageTab } from '@entities/components';
import { LanguageEnum } from '@shared/constants';
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
  const tabs = {
    ru: (
      <ContentWidget
        className={styles.content}
        {...config[LanguageEnum.RU]}
        key={`tab-content-${LanguageEnum.RU}`}
      />
    ),
    en: (
      <ContentWidget
        className={styles.content}
        {...config[LanguageEnum.EN]}
        key={`tab-content-${LanguageEnum.EN}`}
      />
    ),
  };

  return (
    <LanguageTab
      tabs={tabs}
      tabClassName={classNames(styles.wrapper, className)}
    />
  );
};
