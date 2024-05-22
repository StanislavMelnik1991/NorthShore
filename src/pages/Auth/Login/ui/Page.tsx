import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  AuthSkeleton,
  FullWidthSkeleton,
  PasswordField,
} from '@entities/components';
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
          <Title fontWeight="semibold" variant="h2">
            {t('routes.login')}
          </Title>
          <div className={styles.input}>
            <TextField
              value={values.account_number}
              onChange={(ev) =>
                setFieldValue('account_number', ev.target.value)
              }
              placeholder={t('login.placeholder')}
              error={errors.account_number}
            />
            <PasswordField
              value={values.password}
              onChange={(ev) => setFieldValue('password', ev.target.value)}
              placeholder={t('password.placeholder')}
              error={errors.password}
            />
            <Link
              to={AppRoutes[AppRoutesEnum.AUTH_RESTORE_PASSWORD_EMAIL]()}
              className={classNames(styles.link, styles.right)}
            >
              <Text variant="body14" fontWeight="medium">
                {t('actions.forget')}
              </Text>
            </Link>
            <Button size="large" type="submit">
              {t('actions.login')}
            </Button>
          </div>
          <div className={styles.text}>
            <Text variant="body14" fontWeight="regular">
              {t('actions.isNew')}
            </Text>
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
