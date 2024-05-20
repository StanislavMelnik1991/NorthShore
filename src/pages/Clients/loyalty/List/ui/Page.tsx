import InfiniteScroll from 'react-infinite-scroll-component';
import { PageHeader, PageSkeleton, ServicesCard } from '@entities/components';
import {
  AppRoutes,
  AppRoutesEnum,
  SCROLLING_CONTAINER_ID,
} from '@shared/constants';
import { Loader } from '@shared/ui';
import { useList } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { t, data, handleLoadData, hasMore, isLoading, lang } = useList();
  return (
    <PageSkeleton>
      {isLoading && (
        <div className={styles.loader}>
          <Loader size={80} />
        </div>
      )}
      <PageHeader
        breadcrumbs={[
          {
            title: t('sidebar.loyalty'),
          },
        ]}
      />
      <InfiniteScroll
        scrollableTarget={SCROLLING_CONTAINER_ID}
        className={styles.wrapper}
        dataLength={data.length}
        next={handleLoadData}
        hasMore={hasMore}
        loader={
          <div className={styles.loader}>
            <Loader size={80} />
          </div>
        }
        endMessage={''}
      >
        {data.map((el) => {
          return (
            <ServicesCard
              discount={
                el.discount_value
                  ? `${t('discount')} ${el.discount_value}`
                  : undefined
              }
              title={el.title[lang] || ''}
              key={`voting-card-${el.id}`}
              image={el?.image?.url}
              text={el.body[lang] || ''}
              link={AppRoutes[AppRoutesEnum.LOYALTY_CURRENT](el.id)}
            />
          );
        })}
      </InfiniteScroll>
    </PageSkeleton>
  );
};
