import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { WorkModeEnum } from '@shared/constants';
import { IconInfo, IconPoint } from '@shared/icons';
import { Card, Divider, Text } from '@shared/ui';
import styles from './Card.module.scss';

interface Props {
  className?: string;
  id: string | number;
  address: string;
  work_mode: WorkModeEnum;
  alarms: Array<string>;
  actions?: JSX.Element;
}

export const HeatingCard = ({
  className,
  address,
  alarms,
  id,
  work_mode,
  actions,
}: Props) => {
  const { t } = useTranslation('engineering');
  return (
    <Card
      className={classNames(styles.wrapper, className)}
      flexDirection="column"
      gap={16}
    >
      <div className={styles.row}>
        <Text variant="body16" fontWeight="regular">{`№ ${id}`}</Text>
        {actions}
      </div>
      <Text variant="body14" fontWeight="medium" className={styles.address}>
        <IconPoint width={20} height={20} />
        {address}
      </Text>
      <Divider />
      <div className={styles.row}>
        <Text variant="body14" fontWeight="regular">
          {t('operationMode.title')}
        </Text>
        <Text variant="body14" fontWeight="medium">
          {t(`operationMode.${work_mode}`)}
        </Text>
      </div>
      {alarms.map((el, index) => {
        return (
          <div className={styles.row} key={`HeatingCard-alarm-${index}`}>
            <Text variant="body14" fontWeight="regular">
              {el}
            </Text>
            <IconInfo width={24} height={24} className={styles.alarmIcon} />
          </div>
        );
      })}
    </Card>
  );
};
