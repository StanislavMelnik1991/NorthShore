import { useTranslation } from 'react-i18next';
import { PageHeader, PageSkeleton } from '@entities/components';
import { RarusCard } from '@shared/ui';
import applications from '../assets/applications.png';
import styles from './Page.module.scss';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        className={styles.header}
        breadcrumbs={[
          {
            title: t('sidebar.requests'),
          },
        ]}
      />
      <div className={styles.wrapper}>
        <RarusCard
          link={'#'}
          title={t('sidebar.requests')}
          subtitle={t('rarus')}
          img={applications}
        ></RarusCard>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
