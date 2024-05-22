import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button, Title } from '@shared/ui';
import styles from './ModalSubmit.module.scss';

interface Props {
  className?: string;
  handleSubmit: () => void | Promise<void>;
  handleCloseModal: () => void | Promise<void>;
}

export const ModalSubmit = ({
  className,
  handleCloseModal,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation('voting');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title className={styles.title} variant="h4" fontWeight="semibold">
        {t('confident')}
      </Title>
      <div className={styles.controls}>
        <Button
          className={styles.button}
          variant="light"
          onClick={handleCloseModal}
        >
          {t('back')}
        </Button>
        <Button className={styles.button} onClick={handleSubmit}>
          {t('yes')}
        </Button>
      </div>
    </div>
  );
};
