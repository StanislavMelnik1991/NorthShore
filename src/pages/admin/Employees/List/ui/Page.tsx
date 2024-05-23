import {
  Modal,
  ModalDelete,
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { IconLoupe, IconPlus } from '@shared/icons';
import { Card, TextField, Button } from '@shared/ui';
import { Table } from '@shared/ui/Table';
import { useEmployeesList } from '../hooks';
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
    search,
    setSearch,
    handleCreateClick,
    isModalOpen,
    handleCloseModal,
    handleDelete,
  } = useEmployeesList();
  return (
    <PageSkeleton>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalDelete
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          text={t('remove.text')}
          title={t('remove.title')}
        />
      </Modal>
      <PageHeader
        breadcrumbs={[
          { href: location.pathname, title: t('routes.employees') },
        ]}
      />
      <Card padding={12} gap={20} loaderSize={32}>
        <div className={styles.filters__wrapper}>
          <div className={styles.filters__inner}>
            <Button onClick={handleCreateClick}>
              <IconPlus width={24} height={24} />
              {t('controls.create')}
            </Button>
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
