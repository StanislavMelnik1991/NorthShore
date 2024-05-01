import classNames from 'classnames';
import { CustomDatePicker, StyledBar } from '@entities/components';
import { IEngineeringResults } from '@entities/types';
import { Card, Text, Title } from '@shared/ui';
import { useEngineeringChar } from '../hook';
import styles from './Chart.module.scss';

interface Props {
  className?: string;
  data?: IEngineeringResults;
  from: Date;
  to: Date;
  setFrom: (val: Date | null) => void;
  setTo: (val: Date | null) => void;
  isLoading?: boolean;
}

export const EngineeringChart = ({
  className,
  data,
  from,
  to,
  setFrom,
  setTo,
  isLoading,
}: Props) => {
  const { barData, t, total, measures } = useEngineeringChar({
    data,
    from,
    to,
  });
  return (
    <Card
      loading={isLoading}
      className={classNames(styles.wrapper, className)}
      flexDirection="column"
    >
      <Title fontWeight="semibold" variant="h3" className={styles.padding}>
        {t('energy.total')}
      </Title>
      <div className={styles.header}>
        <CustomDatePicker
          wrapperClassName={styles.dataPicker}
          showTimeSelect={false}
          value={from}
          setDate={setFrom}
          dateFormat="dd MM yyyy"
        />
        <CustomDatePicker
          wrapperClassName={styles.dataPicker}
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
    </Card>
  );
};
