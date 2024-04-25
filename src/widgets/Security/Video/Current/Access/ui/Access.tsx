import classNames from 'classnames';
import { SecurityCamera } from '@entities/types';
import { Badge } from '@shared/ui';
import styles from './Access.module.scss';

interface Props {
  className?: string;
  data: SecurityCamera;
}

export const AccessInformation = ({ className, data }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.entrances.map((el, index) => {
        const street = el.building?.street?.name;
        const home = el.building?.name;
        const entrance = el.name;
        const location = `${street ? `${street},` : ''} ${home ? `${home},` : ''} ${entrance ? `${entrance}` : ''}`;
        return (
          <Badge
            className={styles.badge}
            key={`AccessInformation-badge-${index}`}
            color="white"
          >
            {location}
          </Badge>
        );
      })}
    </div>
  );
};
