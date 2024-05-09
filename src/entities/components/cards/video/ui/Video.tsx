import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { EquipmentCondition } from '@shared/constants';
import { Card, Text } from '@shared/ui';
import { CustomVideo } from '../../../';
import styles from './Video.module.scss';

interface Props {
  className?: string;
  video: string;
  name?: string;
  id: number;
  controls?: JSX.Element;
  status: keyof typeof EquipmentCondition;
  muted?: boolean;
}

export const VideoCard = ({
  className,
  id,
  video,
  name,
  controls,
  status,
  muted,
}: Props) => {
  const { t } = useTranslation('security');
  return (
    <Card padding={0} className={classNames(styles.wrapper, className)}>
      <CustomVideo
        className={styles.videoWrapper}
        src={video}
        status={status}
        muted={muted}
      />
      <div className={styles.footer}>
        <div className={styles.text}>
          <Text
            className={styles.textContent}
            fontWeight="regular"
            variant="body14"
          >
            {`${t('cards.camera')} №${id}`}
          </Text>
          <Text className={styles.title} fontWeight="semibold" variant="body16">
            {name}
          </Text>
        </div>
        <div className={styles.controls}>{controls}</div>
      </div>
    </Card>
  );
};
