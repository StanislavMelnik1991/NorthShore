import { useTranslation } from 'react-i18next';
import { SecurityFilters } from '@widgets/Security';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import styles from './Page.module.scss';

const MainPage = () => {
  const { t } = useTranslation('security');

  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        className={styles.header}
        breadcrumbs={[
          {
            title: t('title'),
            href: AppRoutes[AppRoutesEnum.SECURITY](),
          },
          {
            title: t('modules.video'),
            href: AppRoutes[AppRoutesEnum.SECURITY_VIDEO](),
          },
        ]}
      />
      <SecurityFilters />
    </PageSkeleton>
  );
};

export default MainPage;
