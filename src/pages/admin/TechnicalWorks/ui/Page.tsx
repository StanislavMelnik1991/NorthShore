import { Link } from 'react-router-dom';
import { TechnicalWorks } from '@widgets/technicalWorks';
import { Modal, PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Text } from '@shared/ui';
import { useTechnicalWorks } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { t, lang, activeItem, setActiveItem } = useTechnicalWorks();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN](),
            title: t('main'),
          },
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_INFO_TECHNICAL_WORKS](),
            title: t('title'),
          },
        ]}
      />
      <Modal
        isOpen={!!activeItem}
        onClose={() => {
          {
            setActiveItem(undefined);
          }
        }}
      >
        <div className={styles.modal__inner}>
          <Text
            className={styles.textContent}
            variant="body16"
            fontWeight="regular"
          >
            {activeItem?.period}
          </Text>
          <Text className={styles.title}>{activeItem?.item.title[lang]}</Text>
          {activeItem?.item.url && (
            <Link className={styles.link} to={activeItem.item.url}>
              {t('details')}
            </Link>
          )}
          <Text className={styles.text} fontWeight="regular" variant="body16">
            {activeItem?.item.body[lang]}
          </Text>
        </div>
      </Modal>
      <TechnicalWorks
        showFilter
        onClick={({ item: el, period: period }) => {
          setActiveItem({ item: el, period: period });
        }}
      />
    </PageSkeleton>
  );
};
