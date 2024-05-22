import { Link } from 'react-router-dom';
import { AddressFilters } from '@features/address';
import { formatAddress } from '@features/utils';
import {
  HeatingCard,
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
  TableControls,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPlus } from '@shared/icons';
import { Button, CheckBox, Divider } from '@shared/ui';
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
            title: t('routes.elevators.list'),
          },
        ]}
        controls={
          <Link to={AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATOR_CREATE]()}>
            <Button variant="primary" size="small">
              <IconPlus width={20} height={20} />
              {t('routes.elevators.add')}
            </Button>
          </Link>
        }
      />
      <div className={styles.content}>
        <div className={styles.filters}>
          <AddressFilters setFilters={setFilters} />
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
            <HeatingCard
              address={formatAddress(el.entrance || {})}
              alarms={el.alarms || []}
              id={el.id}
              key={`ElevationCard-${el.id}`}
              actions={
                <TableControls
                  rotateIcon
                  getDetailsRoute={
                    AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATOR_CURRENT]
                  }
                  getUpdateRoute={
                    AppRoutes[AppRoutesEnum.ENGINEERING_ELEVATOR_UPDATE]
                  }
                  id={el.id}
                />
              }
            />
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
