import classNames from 'classnames';
import { Modal } from '@entities/components';
import { Button, Text, TextField, Title } from '@shared/ui';
import { useUserEmail } from '../hook';
import styles from './Email.module.scss';

interface Props {
  className?: string;
}

export const UserEmail = ({ className }: Props) => {
  const {
    t,
    user,
    handleClose,
    handleOpen,
    isOpen,
    errors,
    handleSubmit,
    values,
    setFieldValue,
  } = useUserEmail();
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
          <TextField
            value={values.email}
            error={errors.email}
            onChange={(ev) => {
              setFieldValue('email', ev.target.value);
            }}
            label={t('blocks.email.label')}
            placeholder={t('blocks.email.placeholder')}
          />
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
          {t('blocks.email.label')}
        </Text>
        <Text variant="body16" fontWeight="regular">
          {user?.email || '-'}
        </Text>
      </div>
      <Button disabled variant="light" onClick={handleOpen}>
        {t('blocks.btns.edit')}
      </Button>
    </div>
  );
};
