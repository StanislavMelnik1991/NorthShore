import {
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { IconBriefcase, IconLoupe, IconPlus } from '@shared/icons';
import { Button, Card, TextField } from '@shared/ui';
import { Table } from '@shared/ui/Table';
import { useTableConfig, useDataFormatHelper } from '../constants';
import { useEventsList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    location,
    data,
    handleCreateClick,
    search,
    setSearch,
    total,
    setPage,
    perPage,
    setPerPage,
    isLoading,
    status,
    toggleStatusFilter,
    t,
  } = useEventsList();
  const tableConfig = useTableConfig();
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: t('routes.events') }]}
      />
      <Card padding={12} gap={20} loading={isLoading} loaderSize={32}>
        <Button onClick={handleCreateClick}>
          <IconPlus width={24} height={24} />
          {t('controls.create')}
        </Button>
        <Button variant="light" onClick={toggleStatusFilter}>
          <IconBriefcase width={24} height={24} />
          {t(status === 2 ? 'controls.actual' : 'controls.archive')}
        </Button>
        <TextField
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          wrapperClassName={styles.input}
          placeholder={t('controls.find')}
          leftItem={<IconLoupe width={20} height={20} />}
        />
      </Card>
      <Card className={styles.card} flexDirection="column" loading={isLoading}>
        <Table config={tableConfig} items={useDataFormatHelper(data)} />
        <div className={styles.controls}>
          <PerPage active={perPage} setActive={setPerPage} />
          <Pagination total={total} onChange={setPage} />
        </div>
      </Card>
    </PageSkeleton>
  );
};

export default Page;
