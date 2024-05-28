import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconLogo } from '@shared/icons';
import { Button, CodeEditor, Text, Title } from '@shared/ui';
import styles from './ConfirmCode.module.scss';

interface Props {
  className?: string;
  title: string;
  text: string;
  code?: string;
  setCode: (val: string) => void;
  handleSubmit?: () => void;
  handleResend: () => void;
  error?: string;
  submitDisabled?: boolean;
}

export const ConfirmCode = ({
  className,
  text,
  title,
  code,
  setCode,
  handleResend,
  handleSubmit,
  submitDisabled,
  error,
}: Props) => {
  const { t } = useTranslation('auth');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <IconLogo width={140} className={styles.logo} />
      <div className={styles.header}>
        <Title fontWeight="semibold" variant="h2">
          {title}
        </Title>
        <Text variant="body14" fontWeight="regular">
          {text}
        </Text>
      </div>
      <div className={styles.input}>
        <CodeEditor value={code} onChange={setCode} error={error} />
        <Button
          type="button"
          variant="text"
          className={styles.resend}
          onClick={handleResend}
        >
          {t('actions.resend')}
        </Button>
        <Button
          size="large"
          disabled={submitDisabled}
          type={handleSubmit ? 'button' : 'submit'}
          onClick={handleSubmit}
        >
          {t('actions.confirm')}
        </Button>
      </div>
    </div>
  );
};
