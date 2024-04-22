import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Badge, Card, Text } from '@shared/ui';
import styles from './Video.module.scss';

interface Props {
  className?: string;
  video: string;
  name?: string;
  id: number;
}

export const VideoCard = ({ className, id, video, name }: Props) => {
  const { t } = useTranslation('security');
  return (
    <Card padding={0} className={classNames(styles.wrapper, className)}>
      <div className={styles.videoWrapper}>
        <video
          controls
          className={styles.video}
          disablePictureInPicture
          controlsList="nofullscreen"
        >
          <source src={video} type="video/mp4" />
        </video>
        <Badge color="dark" className={styles.timeStamp}>
          {t('cards.onAir')}
        </Badge>
      </div>
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
    </Card>
  );
};
