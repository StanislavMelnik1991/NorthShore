import classNames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalDelete } from '@entities/components';
import { NewsStatusEnum } from '@shared/constants';
import { Button } from '@shared/ui';
import styles from './Update.module.scss';

interface Props {
  className?: string;
  setStatus(val: keyof typeof NewsStatusEnum): void;
  status: keyof typeof NewsStatusEnum;
  isValid: boolean;
  handleDelete(): void;
}

export const ContentUpdateActions = ({
  className,
  isValid,
  setStatus,
  status,
  handleDelete,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation('content');
  const navigate = useNavigate();

  return (
    <div className={classNames(styles.submitBlock, className)}>
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <ModalDelete
          handleCloseModal={() => setOpenModal(false)}
          handleDelete={handleDelete}
          text={t('remove.text')}
          title={t('remove.title')}
        />
      </Modal>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type={'submit'}
        disabled={!isValid}
        onClick={() => {
          setStatus(1);
        }}
      >
        {status ? t('controls.refresh') : t('controls.publish')}
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type={status ? 'button' : 'submit'}
        onClick={status ? () => navigate(-1) : undefined}
      >
        {status ? t('controls.cancel') : t('controls.refresh')}
      </Button>
      <Button
        className={classNames(styles.submitButton, styles.deleteBtn)}
        size="large"
        variant="danger"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        {t('controls.delete')}
      </Button>
    </div>
  );
};
