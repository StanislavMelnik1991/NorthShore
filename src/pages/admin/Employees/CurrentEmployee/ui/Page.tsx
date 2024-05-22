import {
  PageHeader,
  PageSkeleton,
  Modal,
  ModalDelete,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconBasket, IconPencil } from '@shared/icons';
import { Button, Card, Text, Loader } from '@shared/ui';
import { useEmployeesList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    t,
    id,
    data,
    isLoading,
    isModalOpen,
    handleCloseModal,
    handleDelete,
    handleOpenModal,
    handleUpdateClick,
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
          {
            href: AppRoutes[AppRoutesEnum.EMPLOYEES](),
            title: t('routes.employees'),
          },
          { href: '', title: t('routes.employee') + ' № ' + id },
        ]}
        lastTitle={data?.name}
      />
      <Card className={styles.card}>
        {isLoading && (
          <div className={styles.loader}>
            <Loader size={80} />
          </div>
        )}
        <Button
          className={styles.btn__edit}
          variant="text"
          onClick={handleUpdateClick}
        >
          <IconPencil />
          {t('btns.edit')}
        </Button>
        <table>
          <tbody>
            <tr>
              <th className={styles.raw_title}>{t('info_fields.name')}</th>
              <th className={styles.raw_text}>{data?.name}</th>
            </tr>
            <tr>
              <th className={styles.raw_title}>{t('info_fields.phone')}</th>
              <th className={styles.raw_text}>{data?.phone_number}</th>
            </tr>
            <tr>
              <th className={styles.raw_title}>
                {t('info_fields.work_phone')}
              </th>
              <th className={styles.raw_text}>{data?.phone_number}</th>
            </tr>
            <tr>
              <th className={styles.raw_title}>{t('info_fields.post')}</th>
              <th className={styles.raw_text}>{data?.job_title}</th>
            </tr>
            <tr>
              <th className={styles.raw_title}>
                {t('info_fields.department')}
              </th>
              <th className={styles.raw_text}>
                {data && data.department
                  ? data.department.name
                  : t('fields.other')}
              </th>
            </tr>
            <tr>
              <th className={styles.raw_title}>{t('info_fields.role')}</th>
              <th className={styles.raw_text}>
                {data && data.role ? data.role.name : t('fields.noRole')}
              </th>
            </tr>
          </tbody>
        </table>
        <Text className={styles.subtitle}>{t('titles.credentials')}</Text>
        <table>
          <tbody>
            <tr>
              <th className={styles.raw_title}>{t('info_fields.login')}</th>
              <th className={styles.raw_text}>{data?.login}</th>
            </tr>
            <tr>
              <th className={styles.raw_title}>{t('info_fields.password')}</th>
              <th className={styles.raw_text_password}>
                <span>&#183;</span>
                <span>&#183;</span>
                <span>&#183;</span>
                <span>&#183;</span>
                <span>&#183;</span>
                <span>&#183;</span>
                <span>&#183;</span>
                <span>&#183;</span>
              </th>
            </tr>
          </tbody>
        </table>
        <Button
          className={styles.btn__delete}
          variant="danger"
          width={166}
          onClick={handleOpenModal}
        >
          <IconBasket />
          {t('btns.delete')}
        </Button>
      </Card>
    </PageSkeleton>
  );
};

export default Page;
