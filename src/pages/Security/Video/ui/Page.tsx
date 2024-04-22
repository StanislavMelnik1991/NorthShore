import { SecurityFilters } from '@widgets/Security';
import { VideoList } from '@widgets/Security/Video/List/ui/List';
import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPlus } from '@shared/icons';
import { Button } from '@shared/ui';
import { useSecurityVideoPage } from '../hook';
import styles from './Page.module.scss';

const MainPage = () => {
  const {
    t,
    setFilters,
    isFaulty,
    setIsFaulty,
    data,
    isLoading,
    perPage,
    setPerPage,
    setPage,
    total,
  } = useSecurityVideoPage();

  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        breadcrumbs={[
          {
            title: t('title'),
            href: AppRoutes[AppRoutesEnum.SECURITY](),
          },
          {
            title: t('modules.video'),
            href: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
          },
        ]}
        controls={
          <Button variant="primary" size="small">
            <IconPlus width={20} height={20} />
            {t('actions.add')}
          </Button>
        }
      />
      <div className={styles.content}>
        <SecurityFilters
          isFaulty={isFaulty}
          setIsFaulty={setIsFaulty}
          setFilters={setFilters}
        />
        <div className={styles.divider} />
        <VideoList data={data} isLoading={isLoading} />
      </div>
      <div className={styles.controls}>
        <PerPage active={perPage} setActive={setPerPage} />
        <Pagination total={total} onChange={setPage} />
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
