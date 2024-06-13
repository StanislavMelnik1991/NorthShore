import classNames from 'classnames';
import { format } from 'date-fns';
import { CurrentSkeleton } from '@entities/components';
import { IEngineeringResults } from '@entities/types';
import { IconArrow } from '@shared/icons';
import { Badge, Text } from '@shared/ui';
import { Table } from '@shared/ui';
import { useTable } from '../hook';
import styles from './Table.module.scss';

interface Props {
  className?: string;
  from: Date;
  to: Date;
  measures: string;
  results: IEngineeringResults['results'];
  isLoading?: boolean;
  total?: number | string;
}

export const PeriodDetailsTable = ({
  className,
  from,
  to,
  results,
  measures,
  isLoading,
  total,
}: Props) => {
  const { t, header, isExpanded, rows, toggleIsExpanded, wrapperRef } =
    useTable({ measures, results });

  return (
    <CurrentSkeleton
      isLoading={isLoading}
      className={classNames(styles.wrapper, className)}
      flexDirection="row"
    >
      <div ref={wrapperRef} className={styles.content}>
        <div className={styles.header}>
          <Text className={styles.title} variant="body16" fontWeight="semibold">
            {`${format(from, 'dd.MM.yyy')}-${format(to, 'dd.MM.yyy')}`}
          </Text>
          {!!results?.length && !!total && (
            <Badge className={styles.badge} color="white">
              {`${t('header.periodTotal')}: `}
              <Text
                variant="body14"
                fontWeight="semibold"
              >{`${total} ${measures}`}</Text>
            </Badge>
          )}

          <IconArrow
            rotate={isExpanded ? 270 : 180}
            width={24}
            height={24}
            onClick={toggleIsExpanded}
          />
        </div>
        {isExpanded && !!rows.length && <Table config={header} items={rows} />}
      </div>
    </CurrentSkeleton>
  );
};
