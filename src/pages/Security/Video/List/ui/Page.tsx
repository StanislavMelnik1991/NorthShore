import { Link } from 'react-router-dom';
import { VideoList } from '@widgets/Security';
import { AddressFilters } from '@features/address';
import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPlus } from '@shared/icons';
import { Button, CheckBox } from '@shared/ui';
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
    page,
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
          <Link to={AppRoutes[AppRoutesEnum.SECURITY_VIDEO_CREATE]()}>
            <Button variant="primary" size="small">
              <IconPlus width={20} height={20} />
              {t('actions.add')}
            </Button>
          </Link>
        }
      />
      <div className={styles.content}>
        <div className={styles.filters}>
          <AddressFilters setFilters={setFilters} />
          <CheckBox
            wrapperClassName={styles.checkbox}
            value={isFaulty}
            onChange={(val) => {
              setIsFaulty(val);
            }}
            label={t('editor.faulty.label')}
          />
        </div>
        <div className={styles.divider} />
        <VideoList data={data} isLoading={isLoading} />
      </div>
      <div className={styles.controls}>
        <PerPage active={perPage} setActive={setPerPage} />
        <Pagination page={page} total={total} onChange={setPage} />
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
