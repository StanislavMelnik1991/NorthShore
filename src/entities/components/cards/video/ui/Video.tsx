import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { EquipmentCondition } from '@shared/constants';
import { IconCamera } from '@shared/icons';
import { Badge, Card, Text } from '@shared/ui';
import styles from './Video.module.scss';

interface Props {
  className?: string;
  video: string;
  name?: string;
  id: number;
  controls?: JSX.Element;
  status: keyof typeof EquipmentCondition;
}

export const VideoCard = ({
  className,
  id,
  video,
  name,
  controls,
  status,
}: Props) => {
  const { t } = useTranslation('security');
  return (
    <Card padding={0} className={classNames(styles.wrapper, className)}>
      <div className={styles.videoWrapper}>
        {status === 2 ? (
          <div className={styles.videoError}>
            <IconCamera width={24} height={24} />
            <Text fontWeight="medium" variant="body14">
              {t('cards.cameraError')}
            </Text>
          </div>
        ) : (
          <video
            controls
            className={styles.video}
            disablePictureInPicture
            controlsList="nofullscreen"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        <Badge color="dark" className={styles.timeStamp}>
          {status === 1 && <div className={styles.dot} />}
          {t(`cards.${EquipmentCondition[status]}`)}
        </Badge>
      </div>
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
