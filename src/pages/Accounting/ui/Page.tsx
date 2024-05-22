import { useTranslation } from 'react-i18next';
import { PageHeader, PageSkeleton } from '@entities/components';
import { RarusCard } from '@shared/ui';
import buildings from '../assets/buildings.png';
import equipment from '../assets/equipment.png';
import resourses from '../assets/resourses.png';
import documentation from '../assets/documentation.png';
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
          title={t('modules.buildings')}
          subtitle={t('subtitle')}
          img={buildings}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.equipment')}
          subtitle={t('subtitle')}
          img={equipment}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.resourses')}
          subtitle={t('subtitle')}
          img={resourses}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.documentation')}
          subtitle={t('subtitle')}
          img={documentation}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.subsections')}
          subtitle={t('subtitle')}
        ></RarusCard>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
