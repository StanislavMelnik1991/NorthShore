import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui';
import styles from './Create.module.scss';

interface Props {
  className?: string;
  isValid: boolean;
}

export const ContentCreateActions = ({ className, isValid }: Props) => {
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
        {t('controls.publish')}
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
    </div>
  );
};
