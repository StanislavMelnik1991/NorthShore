import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { EquipmentCondition } from '@shared/constants';
import { IconCamera } from '@shared/icons';
import { Badge, Text } from '@shared/ui';
import styles from './CustomVideo.module.scss';

interface Props {
  className?: string;
  status: keyof typeof EquipmentCondition;
  src: string;
  controlsList?: string;
}

export const CustomVideo = ({
  className,
  src,
  status,
  controlsList,
}: Props) => {
  const { t } = useTranslation('security');
  return (
    <div className={classNames(styles.wrapper, className)}>
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
          controlsList={controlsList}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <Badge color="dark" className={styles.timeStamp}>
        {status === 1 && <div className={styles.dot} />}
        {t(`cards.${EquipmentCondition[status]}`)}
      </Badge>
    </div>
  );
};
