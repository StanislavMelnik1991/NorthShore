import classNames from 'classnames';
import { EventsSlider } from '@widgets/events';
import { NewsSlider } from '@widgets/news';
import { PageSkeleton, UserGreetings } from '@entities/components';
import { BREAK_POINT_MOBILE, BREAK_POINT_TAB } from '@shared/constants';
import { Card, Title } from '@shared/ui';
import { sliderConfig } from '../config';
import { useMainPage } from '../hook';
import styles from './Main.module.scss';

const MainPage = () => {
  const { innerWidth, t, dateString, userGreetingsMessage } = useMainPage();

  return (
    <PageSkeleton className={styles.wrapper}>
      <UserGreetings date={dateString} title={userGreetingsMessage} />
      <Card
        className={classNames(styles.card, styles.transparent)}
        flexDirection="column"
        gap={20}
        radius={0}
      >
        <Title variant="h2" fontWeight="semibold">
          {t('sidebar.news')}
        </Title>
        <NewsSlider
          slidesOnPage={
            innerWidth >= BREAK_POINT_TAB
              ? sliderConfig.slidesOnPage.desctop
              : innerWidth > BREAK_POINT_MOBILE
                ? sliderConfig.slidesOnPage.tab
                : sliderConfig.slidesOnPage.mobile
          }
          gap={sliderConfig.gap}
        />
      </Card>
      <Card className={styles.card} flexDirection="column" gap={20} radius={0}>
        <Title variant="h2" fontWeight="semibold">
          {t('poster')}
        </Title>
        <EventsSlider
          slidesOnPage={
            innerWidth >= BREAK_POINT_TAB
              ? sliderConfig.slidesOnPage.desctop
              : innerWidth > BREAK_POINT_MOBILE
                ? sliderConfig.slidesOnPage.tab
                : sliderConfig.slidesOnPage.mobile
          }
          gap={sliderConfig.gap}
        />
      </Card>
    </PageSkeleton>
  );
};

export default MainPage;
