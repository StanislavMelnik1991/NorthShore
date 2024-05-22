import { useTranslation } from 'react-i18next';
import { PageHeader, PageSkeleton } from '@entities/components';
import { RarusCard } from '@shared/ui';
import applications from '../assets/applications.png';
import styles from './Page.module.scss';

const MainPage = () => {
  const { t } = useTranslation('accounting');

  return (
    <PageSkeleton className={styles.wrapper}>
      <PageHeader
        className={styles.header}
        breadcrumbs={[
          {
            title: t('title'),
          },
        ]}
      />
      <div className={styles.wrapper}>
        <RarusCard
          link={'#'}
          title={t('title')}
          subtitle={t('subtitle')}
          img={applications}
        ></RarusCard>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
