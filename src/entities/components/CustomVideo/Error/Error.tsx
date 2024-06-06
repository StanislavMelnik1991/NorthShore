import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconCamera } from '@shared/icons';
import { Text } from '@shared/ui';
import styles from './Error.module.scss';

interface Props {
  className?: string;
}

export const VideoError = ({ className }: Props) => {
  const { t } = useTranslation('security');
  return (
    <div className={classNames(styles.wrapper, className)}>
      <IconCamera width={24} height={24} />
      <Text fontWeight="medium" variant="body14">
        {t('cards.cameraError')}
      </Text>
    </div>
  );
};
