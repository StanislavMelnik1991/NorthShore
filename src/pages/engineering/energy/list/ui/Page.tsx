import { AddressFilters } from '@features/address';
import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { Card } from '@shared/ui';
import { Table } from '@shared/ui';
import { useNewsList } from '../hooks';
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
    page,
    handleChangeAddressFilter,
  } = useNewsList();
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: t('routes.energy') }]}
      />
      <Card padding={12} gap={20} loaderSize={32}>
        <div className={styles.filters}>
          <AddressFilters
            showEntries={false}
            showApartment={false}
            setFilters={handleChangeAddressFilter}
          />
        </div>
      </Card>
      <Card className={styles.card} flexDirection="column" loading={isLoading}>
        <Table config={tableHeader} items={tableData} />
        <div className={styles.controls}>
          <PerPage active={perPage} setActive={setPerPage} />
          <Pagination page={page} total={total} onChange={setPage} />
        </div>
      </Card>
    </PageSkeleton>
  );
};

export default Page;
