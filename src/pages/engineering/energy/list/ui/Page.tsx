import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { Card } from '@shared/ui';
import { Table } from '@shared/ui/Table';
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
  } = useNewsList();
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: t('routes.energy') }]}
      />
      <Card className={styles.card} flexDirection="column" loading={isLoading}>
        <Table config={tableHeader} items={tableData} />
        <div className={styles.controls}>
          <PerPage active={perPage} setActive={setPerPage} />
          <Pagination total={total} onChange={setPage} />
        </div>
      </Card>
    </PageSkeleton>
  );
};

export default Page;
