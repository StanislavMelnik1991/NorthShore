import classNames from 'classnames';
import {
  CurrentSkeleton,
  CustomDatePicker,
  StyledBar,
} from '@entities/components';
import { IEngineeringResults } from '@entities/types';
import { Text, Title } from '@shared/ui';
import { useEngineeringChar } from '../hook';
import styles from './Chart.module.scss';

interface Props {
  className?: string;
  results: IEngineeringResults['results'];
  measures: string;
  from: Date;
  to: Date;
  setFrom: (val: Date | null) => void;
  setTo: (val: Date | null) => void;
  isLoading?: boolean;
  total: number;
}

export const EngineeringChart = ({
  className,
  measures,
  results,
  from,
  to,
  setFrom,
  setTo,
  isLoading,
  total,
}: Props) => {
  const { barData, t } = useEngineeringChar({
    measures,
    results,
    from,
    to,
  });
  return (
    <CurrentSkeleton
      isLoading={isLoading}
      className={classNames(styles.wrapper, className)}
      flexDirection="column"
    >
      <Title fontWeight="semibold" variant="h3" className={styles.padding}>
        {t('energy.total')}
      </Title>
      <div className={styles.header}>
        <CustomDatePicker
          className={styles.dataPicker}
          showTimeSelect={false}
          value={from}
          setDate={setFrom}
          dateFormat="dd MM yyyy"
        />
        <CustomDatePicker
          className={styles.dataPicker}
          dateFormat="dd MM yyyy"
          showTimeSelect={false}
          value={to}
          setDate={setTo}
        />
        <div className={styles.badge}>
          <Text className={styles.gray} fontWeight="regular" variant="body14">
            {t('energy.periodTotal')}
          </Text>
          <Text className={styles.black} fontWeight="semibold" variant="body16">
            {`${total} ${measures}`}
          </Text>
        </div>
      </div>
      <StyledBar className={styles.padding} data={barData} />
    </CurrentSkeleton>
  );
};
