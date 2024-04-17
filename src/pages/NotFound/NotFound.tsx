import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageSkeleton } from '@entities/components';
import { Button, Card, Title } from '@shared/ui';
import styles from './NotFound.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <PageSkeleton className={styles.wrapper}>
      <Card padding={50} flexDirection="column" gap={20}>
        <Title fontWeight="semibold" variant="h1">
          {t('not_found.title')}
        </Title>
        <Button onClick={() => navigate(-1)}>{t('not_found.back')}</Button>
      </Card>
    </PageSkeleton>
  );
};

export default NotFoundPage;
