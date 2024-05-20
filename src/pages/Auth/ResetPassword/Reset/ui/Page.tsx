import {
  AuthSkeleton,
  FullWidthSkeleton,
  PasswordField,
} from '@entities/components';
import { IconLogo } from '@shared/icons';
import { Button, Text, Title } from '@shared/ui';
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
              {t('routes.creationPassword.title')}
            </Title>
            <Text variant="body14" fontWeight="regular">
              {t('routes.creationPassword.description')}
            </Text>
          </div>
          <div className={styles.input}>
            <PasswordField
              name={'password'}
              value={values.password}
              onChange={(ev) => setFieldValue('password', ev.target.value)}
              placeholder={t('password.placeholder')}
              error={errors.password}
            />
            <PasswordField
              name="password_confirmation"
              value={values.confirmPassword}
              onChange={(ev) =>
                setFieldValue('confirmPassword', ev.target.value)
              }
              placeholder={t('confirmPassword.placeholder')}
              error={errors.confirmPassword}
            />
            <Button className={styles.submitButton} type="submit">
              {t('actions.confirm')}
            </Button>
          </div>
        </form>
      </AuthSkeleton>
    </FullWidthSkeleton>
  );
};
