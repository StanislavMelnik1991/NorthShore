import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui';
import styles from './Submit.module.scss';

interface Props {
  className?: string;
  isValid: boolean;
  submitText: string;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}

export const SubmitActions = ({
  className,
  isValid,
  submitText,
  onDelete,
}: Props) => {
  const { t } = useTranslation('content');
  const navigate = useNavigate();
  return (
    <div className={classNames(styles.submitBlock, className)}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="submit"
        disabled={!isValid}
      >
        {submitText}
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type="button"
        disabled={!isValid}
        onClick={() => navigate(-1)}
      >
        {t('controls.cancel')}
      </Button>
      {onDelete && (
        <Button
          className={classNames(styles.submitButton, styles.deleteBtn)}
          size="large"
          variant="danger"
          type="button"
          onClick={onDelete}
        >
          {t('controls.delete')}
        </Button>
      )}
    </div>
  );
};
