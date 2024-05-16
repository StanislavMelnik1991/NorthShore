import { Link } from 'react-router-dom';
import {
  Modal,
  ModalDelete,
  PageHeader,
  PageSkeleton,
  Pagination,
  PerPage,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconBriefcase, IconLoupe, IconPlus } from '@shared/icons';
import { Table } from '@shared/ui';
import { Button, Card, TextField } from '@shared/ui';
import { useVotingList } from '../hooks';
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
    t,
    page,
    handleToggleIsDeleted,
    isDeleted,
    handleDelete,
    handleCloseModal,
    isModalOpen,
  } = useVotingList();
  return (
    <PageSkeleton>
      <PageHeader breadcrumbs={[{ title: t('sidebar.advertisement') }]} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalDelete
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          text={t('remove.text')}
          title={t('remove.title')}
        />
      </Modal>
      <Card padding={12} gap={20} loaderSize={32}>
        <Link to={AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT_CREATE]()}>
          <Button>
            <IconPlus width={24} height={24} />
            {t('controls.create')}
          </Button>
        </Link>
        <Button variant="light" onClick={handleToggleIsDeleted}>
          <IconBriefcase width={24} height={24} />
          {t(isDeleted ? 'controls.actual' : 'controls.archive')}
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
