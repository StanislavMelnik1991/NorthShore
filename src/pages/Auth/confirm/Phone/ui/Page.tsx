import { AuthSkeleton, FullWidthSkeleton } from '@entities/components';
import { IconLogo } from '@shared/icons';
import { Button, CodeEditor, Text, Title } from '@shared/ui';
import { useLoginPage } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { errors, handleSubmit, setFieldValue, values, t, handleResend } =
    useLoginPage();
  return (
    <FullWidthSkeleton>
      <AuthSkeleton>
        <form onSubmit={handleSubmit} className={styles.wrapper}>
          <IconLogo width={140} className={styles.logo} />
          <div className={styles.header}>
            <Title fontWeight="semibold" variant="h2">
              {t('routes.code')}
            </Title>
            <Text
              variant="body14"
              fontWeight="regular"
            >{`${t('code.phone')}`}</Text>
          </div>
          <div className={styles.input}>
            <CodeEditor
              value={values.phone_code}
              onChange={(val) => setFieldValue('phone_code', val)}
              error={errors.phone_code}
            />
            <Button
              type="button"
              variant="text"
              className={styles.resend}
              onClick={handleResend}
            >
              {t('actions.resend')}
            </Button>
            <Button size="large" type="submit">
              {t('actions.confirm')}
            </Button>
          </div>
        </form>
      </AuthSkeleton>
    </FullWidthSkeleton>
  );
};
