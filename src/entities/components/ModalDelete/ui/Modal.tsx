import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, Title } from '@shared/ui';
import styles from './Modal.module.scss';

interface Props {
  className?: string;
  title: string;
  text: string;
  handleDelete: MouseEventHandler<HTMLButtonElement>;
  handleCloseModal: MouseEventHandler<HTMLButtonElement>;
}

export const ModalDelete = ({
  className,
  handleDelete,
  text,
  title,
  handleCloseModal,
}: Props) => {
  const { t } = useTranslation('content');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title fontWeight="semibold" variant="h4">
        {title}
      </Title>
      <Text className={styles.dark} fontWeight="regular" variant="body14">
        {text}
      </Text>
      <div className={styles.modalButtons}>
        <Button
          className={styles.submitButton}
          size="large"
          variant="secondary"
          type={'button'}
          onClick={handleCloseModal}
        >
          {t('controls.cancel')}
        </Button>

        <Button
          className={classNames(styles.submitButton, styles.deleteBtn)}
          size="large"
          variant="danger"
          type="button"
          onClick={handleDelete}
        >
          {t('controls.delete')}
        </Button>
      </div>
    </div>
  );
};
