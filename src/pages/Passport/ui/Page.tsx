import { useTranslation } from 'react-i18next';
import { PageHeader, PageSkeleton } from '@entities/components';
import { RarusCard } from '@shared/ui';
import residents from '../assets/residents.png';
import registr_res from '../assets/registr_res.png';
import registr_stay from '../assets/registr_stay.png';
import log_books from '../assets/log_books.png';
import styles from './Page.module.scss';

const MainPage = () => {
  const { t } = useTranslation('passport');

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
          title={t('modules.residents')}
          subtitle={t('subtitle')}
          img={residents}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.registr_res')}
          subtitle={t('subtitle')}
          img={registr_res}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.registr_stay')}
          subtitle={t('subtitle')}
          img={registr_stay}
        ></RarusCard>
        <RarusCard
          link={'#'}
          title={t('modules.log_books')}
          subtitle={t('subtitle')}
          img={log_books}
        ></RarusCard>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
