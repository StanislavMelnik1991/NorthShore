import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NewsStatusEnum } from '@shared/constants';
import { Button } from '@shared/ui';
import styles from './Create.module.scss';

interface Props {
  className?: string;
  setStatus(val: keyof typeof NewsStatusEnum): void;
  isValid: boolean;
}

export const ContentCreateActions = ({
  className,
  isValid,
  setStatus,
}: Props) => {
  const { t } = useTranslation('content');
  return (
    <div className={classNames(styles.submitBlock, className)}>
      <Button
        className={styles.submitButton}
        size="large"
        variant="primary"
        type="submit"
        disabled={!isValid}
        onClick={() => setStatus(1)}
      >
        {t('controls.publish')}
      </Button>
      <Button
        className={styles.submitButton}
        size="large"
        variant="secondary"
        type="submit"
        disabled={!isValid}
        onClick={() => setStatus(0)}
      >
        {t('controls.draft')}
      </Button>
    </div>
  );
};
