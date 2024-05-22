import { PersonalNotification } from '@widgets/Content/personalNotification';
import { AddressFilters } from '@features/address';
import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { IconLoupe } from '@shared/icons';
import { Card, TextField } from '@shared/ui';
import { Table } from '@shared/ui/Table';
import { useResidentsList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    tableData,
    tableHeader,
    total,
    setPage,
    perPage,
    setPerPage,
    isLoading,
    t,
    setFilters,
    search,
    setSearch,
    open,
    setOpen,
    popUpId,
  } = useResidentsList();
  return (
    <PageSkeleton>
      <PersonalNotification id={popUpId || '1'} open={open} setOpen={setOpen} />
      <PageHeader
        breadcrumbs={[
          { href: location.pathname, title: t('routes.residents') },
        ]}
      />
      <Card padding={12} gap={20} loaderSize={32}>
        <div className={styles.filters__wrapper}>
          <div className={styles.filters__inner}>
            <AddressFilters
              className={styles.address}
              showApartment
              setFilters={setFilters}
            />
          </div>
          <TextField
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            wrapperClassName={styles.input}
            placeholder={t('controls.find')}
            leftItem={<IconLoupe width={20} height={20} />}
          />
        </div>
      </Card>
      <Card className={styles.card} flexDirection="column" loading={isLoading}>
        <div className={styles.table__wrapper}>
          <Table config={tableHeader} items={tableData} />
        </div>
        <div className={styles.controls}>
          <PerPage active={perPage} setActive={setPerPage} />
          <Pagination total={total} onChange={setPage} />
        </div>
      </Card>
    </PageSkeleton>
  );
};

export default Page;
