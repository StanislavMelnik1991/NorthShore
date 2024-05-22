import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AuthSkeleton, FullWidthSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconLogo } from '@shared/icons';
import { Button, Text, TextField, Title } from '@shared/ui';
import { useLoginPage } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { errors, handleSubmit, setFieldValue, values, t } = useLoginPage();
  return (
    <FullWidthSkeleton>
      <AuthSkeleton>
        <form onSubmit={handleSubmit} className={styles.wrapper}>
          <IconLogo width={140} className={styles.logo} />
          <div className={styles.header}>
            <Title fontWeight="semibold" variant="h2">
              {t('routes.restore.title')}
            </Title>
            <Text
              className={styles.description}
              variant="body14"
              fontWeight="regular"
            >
              {t('routes.restore.description')}
            </Text>
          </div>
          <div className={styles.input}>
            <TextField
              value={values.target}
              onChange={(ev) => setFieldValue('target', ev.target.value)}
              placeholder={t('phone_number.placeholder')}
              error={errors.target}
            />
            <Link
              to={AppRoutes[AppRoutesEnum.AUTH_RESTORE_PASSWORD_EMAIL]()}
              className={classNames(styles.link, styles.right)}
            >
              <Text variant="body14" fontWeight="medium">
                {t('actions.useMail')}
              </Text>
            </Link>
            <Button size="large" type="submit">
              {t('actions.continue')}
            </Button>
          </div>
          <div className={styles.text}>
            <Link
              to={AppRoutes[AppRoutesEnum.AUTH_LOGIN]()}
              className={classNames(styles.link)}
            >
              <Text variant="body14" fontWeight="regular">
                {t('actions.login')}
              </Text>
            </Link>
            <Link
              to={AppRoutes[AppRoutesEnum.AUTH_REGISTRATION]()}
              className={classNames(styles.link)}
            >
              <Text variant="body14" fontWeight="regular">
                {t('actions.registration')}
              </Text>
            </Link>
          </div>
        </form>
      </AuthSkeleton>
    </FullWidthSkeleton>
  );
};
