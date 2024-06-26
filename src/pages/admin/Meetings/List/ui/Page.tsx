import { ContentWithLanguageSelection } from '@widgets/Content';
import {
  Modal,
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { IconBriefcase, IconLoupe, IconPlus } from '@shared/icons';
import { Button, Card, TextField } from '@shared/ui';
import { Table } from '@shared/ui';
import { useMeetingsList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    tableData,
    tableHeader,
    handleCreateClick,
    search,
    setSearch,
    total,
    setPage,
    perPage,
    setPerPage,
    isLoading,
    status,
    page,
    toggleStatusFilter,
    t,
    config,
    open,
    setOpen,
  } = useMeetingsList();
  return (
    <PageSkeleton>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ContentWithLanguageSelection config={config} />
      </Modal>
      <PageHeader breadcrumbs={[{ title: t('routes.meetings') }]} />
      <Card padding={12} gap={20} loaderSize={32}>
        <Button onClick={handleCreateClick}>
          <IconPlus width={24} height={24} />
          {t('controls.create')}
        </Button>
        <Button variant="light" onClick={toggleStatusFilter}>
          <IconBriefcase width={24} height={24} />
          {t(status ? 'controls.actual' : 'controls.archive')}
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
