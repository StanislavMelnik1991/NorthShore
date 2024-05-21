import { Link } from 'react-router-dom';
import { AddressFilters } from '@features/address';
import { formatAddress } from '@features/utils';
import {
  HeatingCard,
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { CheckBox, Divider } from '@shared/ui';
import { useList } from '../hook';
import styles from './Page.module.scss';

const MainPage = () => {
  const {
    data,
    handleSetPage,
    handleSetPerPage,
    setFilters,
    setIsAccident,
    total,
    t,
    isAccident,
    page,
    perPage,
  } = useList();

  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        breadcrumbs={[
          {
            title: t('routes.heating'),
          },
        ]}
      />
      <div className={styles.content}>
        <div className={styles.filters}>
          <AddressFilters setFilters={setFilters} showEntries={false} />
          <CheckBox
            wrapperClassName={styles.checkbox}
            value={isAccident}
            onChange={setIsAccident}
            label={t('faulty.label')}
          />
        </div>
        <Divider />

        {data.map((el) => {
          return (
            <Link
              key={`HeatingCard-${el.id}`}
              to={AppRoutes[AppRoutesEnum.ENGINEERING_HEATING_CURRENT](el.id)}
            >
              <HeatingCard
                address={formatAddress(el.building || el.entrance)}
                alarms={el.alarms || []}
                id={el.id}
                work_mode={el.work_mode}
              />
            </Link>
          );
        })}
      </div>
      <div className={styles.controls}>
        <PerPage active={perPage} setActive={handleSetPerPage} />
        <Pagination page={page} total={total} onChange={handleSetPage} />
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
