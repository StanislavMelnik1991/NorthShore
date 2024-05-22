import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Button, Text, Title } from '@shared/ui';
import image from './assets/image.png';
import styles from './NotFound.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <PageSkeleton className={styles.wrapper}>
      <img src={image} alt="not found" className={styles.image} />
      <div className={styles.textContent}>
        <Title fontWeight="semibold" variant="h2">
          {t('not_found.title')}
        </Title>
        <Text variant="body16" fontWeight="regular" className={styles.text}>
          {t('not_found.text')}
        </Text>
      </div>
      <div className={styles.controls}>
        <Button
          className={styles.button}
          size="large"
          variant="white"
          onClick={() => navigate(-1)}
        >
          {t('not_found.back')}
        </Button>
        <Link to={AppRoutes[AppRoutesEnum.MAIN]()} className={styles.button}>
          <Button className={styles.button} size="large">
            {t('not_found.toMain')}
          </Button>
        </Link>
      </div>
    </PageSkeleton>
  );
};

export default NotFoundPage;
