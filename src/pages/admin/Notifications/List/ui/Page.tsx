import { Link } from 'react-router-dom';
import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconLoupe, IconPlus } from '@shared/icons';
import { Button, Card, TextField } from '@shared/ui';
import { Table } from '@shared/ui';
import { useMeetingsList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    tableData,
    tableHeader,
    search,
    setSearch,
    total,
    setPage,
    perPage,
    setPerPage,
    isLoading,
    page,
    t,
  } = useMeetingsList();
  return (
    <PageSkeleton>
      <PageHeader breadcrumbs={[{ title: t('routes.list') }]} />
      <Card padding={12} gap={20} loaderSize={32}>
        <Link to={AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS_CREATE]()}>
          <Button>
            <IconPlus width={24} height={24} />
            {t('controls.create')}
          </Button>
        </Link>
        <TextField
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          wrapperClassName={styles.input}
          placeholder={t('controls.find')}
          leftItem={<IconLoupe width={20} height={20} />}
        />
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
