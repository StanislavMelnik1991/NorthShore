import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { EventsSlider } from '@widgets/events';
import { NewsSlider } from '@widgets/news';
import { PageSkeleton } from '@entities/components';
import { Card, Title } from '@shared/ui';
import { sliderConfig } from '../config';
import styles from './Main.module.scss';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <PageSkeleton className={styles.wrapper}>
      <Card
        className={classNames(styles.card, styles.transparent)}
        flexDirection="column"
        gap={20}
        radius={0}
      >
        <Title variant="h2" fontWeight="semibold">
          {t('sidebar.news')}
        </Title>
        <NewsSlider {...sliderConfig} />
      </Card>
      <Card className={styles.card} flexDirection="column" gap={20} radius={0}>
        <Title variant="h2" fontWeight="semibold">
          {t('poster')}
        </Title>
        <EventsSlider {...sliderConfig} />
      </Card>
    </PageSkeleton>
  );
};

export default MainPage;
