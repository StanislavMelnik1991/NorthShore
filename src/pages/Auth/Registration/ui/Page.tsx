import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  AuthSkeleton,
  FullWidthSkeleton,
  PasswordField,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconLogo } from '@shared/icons';
import { Button, CheckBox, Text, TextField, Title } from '@shared/ui';
import { useLoginPage } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { errors, handleSubmit, setFieldValue, values, t, isValid } =
    useLoginPage();
  return (
    <FullWidthSkeleton>
      <AuthSkeleton>
        <form onSubmit={handleSubmit} className={styles.wrapper}>
          <IconLogo width={140} className={styles.logo} />
          <Title fontWeight="semibold" variant="h2">
            {t('routes.registration')}
          </Title>
          <div className={styles.input}>
            <TextField
              name="phone"
              value={values.phone_number}
              onChange={(ev) => setFieldValue('phone_number', ev.target.value)}
              placeholder={t('phone_number.placeholder')}
              error={errors.phone_number}
            />
            <TextField
              value={values.account_number}
              onChange={(ev) =>
                setFieldValue('account_number', ev.target.value)
              }
              placeholder={t('account_number.placeholder')}
              error={errors.account_number}
            />
            <TextField
              name="email"
              value={values.email}
              onChange={(ev) => setFieldValue('email', ev.target.value)}
              placeholder={t('email.placeholder')}
              error={errors.email}
              type="email"
            />
            <TextField
              name="name"
              value={values.name}
              onChange={(ev) => setFieldValue('name', ev.target.value)}
              placeholder={t('name.placeholder')}
              error={errors.name}
            />
            <TextField
              name="surname"
              value={values.surname}
              onChange={(ev) => setFieldValue('surname', ev.target.value)}
              placeholder={t('surname.placeholder')}
              error={errors.surname}
            />
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
            <div className={styles.checkbox}>
              <CheckBox
                value={Boolean(values.is_accepted)}
                onChange={(val) => setFieldValue('is_accepted', val)}
                id={'is_accepted'}
              />
              <label htmlFor="is_accepted" className={styles.label}>
                <Text variant="body13" fontWeight="medium">
                  {t('is_accepted.label')}
                </Text>
                <Link
                  className={classNames(styles.link)}
                  target="_blank"
                  to={
                    'https://docs.google.com/document/d/1QsxMmeVdLRRMTDffA2yPBL3JmCKCii8-/mobilebasic'
                  }
                >
                  <Text variant="body13" fontWeight="medium">
                    {t('is_accepted.link')}
                  </Text>
                </Link>
              </label>
            </div>
            <Button
              size="large"
              type="submit"
              disabled={!isValid || !values.is_accepted}
            >
              {t('actions.registration')}
            </Button>
          </div>
          <div className={styles.text}>
            <Text variant="body14" fontWeight="regular">
              {t('actions.alreadyExist.label')}
            </Text>
            <Link
              to={AppRoutes[AppRoutesEnum.AUTH_LOGIN]()}
              className={classNames(styles.link)}
            >
              <Text variant="body14" fontWeight="regular">
                {t('actions.alreadyExist.link')}
              </Text>
            </Link>
          </div>
        </form>
      </AuthSkeleton>
    </FullWidthSkeleton>
  );
};
