import { extractTextFromHtml } from '@features/utils/html';
import { imageParser } from '@features/utils/imageParser';
import { NewsCard, PageHeader, PageSkeleton } from '@entities/components';
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
            <NewsCard
              link={AppRoutes[AppRoutesEnum.EVENT_CURRENT](el.id)}
              title={el.title[lang]}
              text={extractTextFromHtml(el.html_content[lang])}
              image={cover}
              key={`news-card-${el.id}`}
              published_date={new Date(el.published_at * 1000)}
            />
          );
        })}
      </div>
    </PageSkeleton>
  );
};
