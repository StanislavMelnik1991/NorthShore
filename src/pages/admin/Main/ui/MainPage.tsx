import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TechnicalWorks } from '@widgets/technicalWorks';
import { PageSkeleton, UserGreetings } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Text } from '@shared/ui';
import { useMainPage } from '../hook';
import styles from './Main.module.scss';

const MainPage = () => {
  const { dateString, userGreetingsMessage } = useMainPage();
  const { t } = useTranslation();

  return (
    <PageSkeleton className={styles.wrapper}>
      <UserGreetings date={dateString} title={userGreetingsMessage} />
      <div className={styles.main__wrapper}>
        <div>{'тут будут информационные сообщения'}</div>
        <div className={styles.right}>
          <div className={styles.block__header}>
            <Text className={styles.title}> {t('sidebar.technicalWorks')}</Text>
            <Link
              className={styles.title__text}
              to={AppRoutes[AppRoutesEnum.ADMIN_INFO_TECHNICAL_WORKS]()}
            >
              {t('all')}
            </Link>
          </div>
          <TechnicalWorks />
        </div>
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
