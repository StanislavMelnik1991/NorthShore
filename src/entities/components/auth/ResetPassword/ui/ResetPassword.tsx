import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconLogo } from '@shared/icons';
import { Button, Text, TextField, Title } from '@shared/ui';
import styles from './ResetPassword.module.scss';

interface Props {
  className?: string;
  title: string;
  text: string;
  value?: string;
  setValue: (val: string) => void;
  handleSubmit?: () => void;
  error?: string;
  submitDisabled?: boolean;
  placeholder: string;
  changeMethod?: {
    to: string;
    text: string;
  };
}

export const ResetPassword = ({
  className,
  title,
  text,
  setValue,
  error,
  handleSubmit,
  submitDisabled,
  changeMethod,
  placeholder,
  value,
}: Props) => {
  const { t } = useTranslation('auth');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <IconLogo width={140} className={styles.logo} />
      <div className={styles.header}>
        <Title fontWeight="semibold" variant="h2">
          {title}
        </Title>
        <Text
          className={styles.description}
          variant="body14"
          fontWeight="regular"
        >
          {text}
        </Text>
      </div>
      <div className={styles.input}>
        <TextField
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          placeholder={placeholder}
          error={error}
        />
        {changeMethod && (
          <Link
            to={changeMethod.to}
            className={classNames(styles.link, styles.right)}
          >
            <Text variant="body14" fontWeight="medium">
              {changeMethod.text}
            </Text>
          </Link>
        )}
        <Button
          size="large"
          type={handleSubmit ? 'button' : 'submit'}
          onClick={handleSubmit}
          disabled={submitDisabled}
        >
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
    </div>
  );
};
