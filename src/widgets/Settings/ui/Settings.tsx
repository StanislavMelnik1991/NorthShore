import { Card, Title } from '@shared/ui';
import { useSettings } from '../hook';
import { Avatar } from './Avatar';
import { UserDeleting } from './Deleting';
import { UserEmail } from './Email';
import { UserLanguage } from './Language';
import { UserName } from './Name';
import { UserPassword } from './Password';
import { UserPhone } from './Phone';
import styles from './Settings.module.scss';

export const Settings = () => {
  const { t, isLoading, user } = useSettings();

  if (!user) {
    return <></>;
  }

  return (
    <Card className={styles.wrapper} loading={isLoading} flexDirection="column">
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
  );
};
