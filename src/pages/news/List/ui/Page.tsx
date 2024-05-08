import InfiniteScroll from 'react-infinite-scroll-component';
import { extractTextFromHtml } from '@features/utils/html';
import { imageParser } from '@features/utils/imageParser';
import { NewsCard, PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { SCROLLING_CONTAINER_ID } from '@shared/constants/scrolling';
import { Loader } from '@shared/ui';
import { useNewsListPage } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { data, handleLoadNews, hasMore, lang, t } = useNewsListPage();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          { href: AppRoutes[AppRoutesEnum.NEWS](), title: t('routes.news') },
        ]}
      />
      <InfiniteScroll
        scrollableTarget={SCROLLING_CONTAINER_ID}
        className={styles.wrapper}
        dataLength={data.length}
        next={handleLoadNews}
        hasMore={hasMore}
        loader={
          <div className={styles.loader}>
            <Loader size={80} />
          </div>
        }
        endMessage={''}
      >
        {data.map((el) => {
          const cover = el.cover || imageParser(el.html_content[lang])[0];
          return (
            <NewsCard
              link={AppRoutes[AppRoutesEnum.NEWS_CURRENT](el.id)}
              title={el.title[lang]}
              text={extractTextFromHtml(el.html_content[lang])}
              image={cover}
              key={`news-card-${el.id}`}
              published_date={new Date(el.published_at * 1000)}
            />
          );
        })}
      </InfiniteScroll>
    </PageSkeleton>
  );
};
