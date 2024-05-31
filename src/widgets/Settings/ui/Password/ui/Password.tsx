import classNames from 'classnames';
import { Modal, PasswordField } from '@entities/components';
import { Button, Dot, Text, Title } from '@shared/ui';
import { useUserPassword } from '../hook';
import styles from './Password.module.scss';

interface Props {
  className?: string;
}

export const UserPassword = ({ className }: Props) => {
  const {
    t,
    errors,
    handleClose,
    handleOpen,
    handleSubmit,
    isOpen,
    setFieldValue,
    values,
  } = useUserPassword();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Title
            className={styles.formTitle}
            variant="h3"
            fontWeight="semibold"
          >
            {t('blocks.titles.changeEmail')}
          </Title>
          <div className={styles.formInputs}>
            <PasswordField
              value={values.old_password}
              error={errors.old_password}
              onChange={(ev) => {
                setFieldValue('old_password', ev.target.value);
              }}
              label={t('blocks.passwordOld.label')}
              placeholder={t('blocks.passwordOld.placeholder')}
            />
            <PasswordField
              value={values.password}
              error={errors.password}
              onChange={(ev) => {
                setFieldValue('password', ev.target.value);
              }}
              label={t('blocks.password.label')}
              placeholder={t('blocks.password.placeholder')}
            />
            <PasswordField
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={(ev) => {
                setFieldValue('confirmPassword', ev.target.value);
              }}
              label={t('blocks.passwordConfirm.label')}
              placeholder={t('blocks.passwordConfirm.placeholder')}
            />
          </div>
          <div className={styles.formButtons}>
            <Button
              className={styles.button}
              variant="light"
              type="button"
              onClick={handleClose}
            >
              {t('blocks.btns.cancel')}
            </Button>
            <Button className={styles.button} variant="primary" type="submit">
              {t('blocks.btns.next')}
            </Button>
          </div>
        </form>
      </Modal>
      <div className={styles.label}>
        <Text variant="body14" fontWeight="regular" className={styles.dark}>
          {t('blocks.password.label')}
        </Text>
        <div className={styles.dots}>
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
          <Dot color="dark" className={styles.dot} />
        </div>
      </div>
      <Button onClick={handleOpen} variant="light">
        {t('blocks.btns.edit')}
      </Button>
    </div>
  );
};
