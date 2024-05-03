import classNames from 'classnames';
import { formatAddress } from '@features/utils';
import { IEntranceFull } from '@entities/types';
import { Badge, Text } from '@shared/ui';
import styles from './Access.module.scss';

interface Props {
  className?: string;
  data: {
    entrances: IEntranceFull[];
  };
}

export const AccessInformation = ({ className, data }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {data.entrances.map((el, index) => {
        const location = formatAddress({ entrance: el });
        return (
          <Badge
            className={styles.badge}
            key={`AccessInformation-badge-${index}`}
            color="white"
          >
            <Text variant="body14">{location}</Text>
          </Badge>
        );
      })}
    </div>
  );
};
