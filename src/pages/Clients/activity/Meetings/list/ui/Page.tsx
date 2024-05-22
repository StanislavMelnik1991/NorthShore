import InfiniteScroll from 'react-infinite-scroll-component';
import {
  PageHeader,
  PageSkeleton,
  StyledSelect,
  MeetingCard,
} from '@entities/components';
import {
  AppRoutes,
  AppRoutesEnum,
  SCROLLING_CONTAINER_ID,
} from '@shared/constants';
import { Loader } from '@shared/ui';
import { useList } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const {
    t,
    data,
    handleLoadData,
    hasMore,
    isLoading,
    lang,
    filterConfig,
    handleFilterChange,
    status,
  } = useList();
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
            href: AppRoutes[AppRoutesEnum.ACTIVITY_MEETINGS](),
            title: t('routes.meetings'),
          },
        ]}
      />
      <StyledSelect
        value={status}
        options={filterConfig}
        onChange={handleFilterChange}
        required
        isClearable={false}
        className={styles.select}
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
            <MeetingCard
              title={el.title[lang] || ''}
              key={`voting-card-${el.id}`}
              date={new Date(el.published_at * 1000)}
              deadLine={new Date(el.target_date * 1000)}
              link={AppRoutes[AppRoutesEnum.ACTIVITY_MEETINGS_CURRENT](el.id)}
            />
          );
        })}
      </InfiniteScroll>
    </PageSkeleton>
  );
};
