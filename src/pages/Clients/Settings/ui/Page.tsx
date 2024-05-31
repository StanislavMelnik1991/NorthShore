import {
  Avatar,
  UserDeleting,
  UserEmail,
  UserLanguage,
  UserName,
  UserPassword,
  UserPhone,
} from '@widgets/Settings';
import { PageHeader, PageSkeleton } from '@entities/components';
import { Card, Title } from '@shared/ui';
import { useSettings } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { t, isLoading } = useSettings();
  return (
    <PageSkeleton>
      <PageHeader breadcrumbs={[{ title: t('title') }]} />
      <Card
        className={styles.wrapper}
        loading={isLoading}
        flexDirection="column"
      >
        <Title variant="h3" fontWeight="semibold">
          {t('blocks.titles.profile_data')}
        </Title>
        <Avatar />
        <div className={styles.smallContainer}>
          <UserName />
          <UserEmail />
          <UserPhone />
        </div>
        <Title variant="h3" fontWeight="semibold">
          {t('blocks.titles.account_management')}
        </Title>
        <div className={styles.smallContainer}>
          <UserPassword />
          <UserDeleting />
          <UserLanguage />
        </div>
      </Card>
    </PageSkeleton>
  );
};
