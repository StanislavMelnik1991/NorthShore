import { imageParser } from '@features/utils/imageParser';
import { EventsCard, PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useEventsListPage } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { events, t, lang } = useEventsListPage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          { href: AppRoutes[AppRoutesEnum.NEWS](), title: t('routes.events') },
        ]}
      />
      <div className={styles.wrapper}>
        {events.map((el) => {
          const cover = el.cover || imageParser(el.html_content[lang])[0];
          return (
            <EventsCard
              link={AppRoutes[AppRoutesEnum.EVENT_CURRENT](el.id)}
              title={el.title[lang]}
              date={new Date(el.target_date * 1000)}
              image={cover}
              key={`news-card-${el.id}`}
            />
          );
        })}
      </div>
    </PageSkeleton>
  );
};
