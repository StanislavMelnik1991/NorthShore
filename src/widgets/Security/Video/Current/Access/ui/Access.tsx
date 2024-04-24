import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { SecurityCamera } from '@entities/types';
import { Badge } from '@shared/ui';
import styles from './Access.module.scss';

interface Props {
  className?: string;
  data: SecurityCamera;
}

export const AccessInformation = ({ className, data }: Props) => {
  const { t } = useTranslation('security');
  /*   const street = data.street.name;
  const home = data.building?.name;
  const entrance = data.entrance?.name;
  const location = `${street ? `${t('camera.street')} ${street}` : ''} ${home ? `${t('camera.home')} ${home}` : ''} ${entrance ? `${t('camera.entrance')} ${entrance}` : ''}`; */
  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.entrances.map((el, index) => {
        const street = el.building?.street?.name;
        const home = el.building?.name;
        const entrance = el.name;
        const location = `${street ? `${t('camera.street')} ${street}` : ''} ${home ? `${t('camera.home')} ${home}` : ''} ${entrance ? `${t('camera.entrance')} ${entrance}` : ''}`;
        return (
          <Badge key={`AccessInformation-badge-${index}`} color="white">
            {location}
          </Badge>
        );
      })}
    </div>
  );
};
