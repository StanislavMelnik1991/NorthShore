import classNames from 'classnames';
import { CurrentSkeleton } from '@entities/components';
import { IconArrow } from '@shared/icons';
import { Badge, Text } from '@shared/ui';
import { Table } from '@shared/ui/Table';
import { useTable } from '../hook';
import styles from './Table.module.scss';

interface Props {
  className?: string;
  date: Date;
  id: string;
  measures: string;
  total?: number;
}

export const MonthDetailsTable = ({
  className,
  date,
  id,
  measures,
  total,
}: Props) => {
  const {
    t,
    isExpanded,
    isLoading,
    month,
    toggleIsExpanded,
    wrapperRef,
    header,
    rows,
  } = useTable({ date, id, measures });

  return (
    <CurrentSkeleton
      isLoading={isLoading}
      className={classNames(styles.wrapper, className)}
      flexDirection="row"
    >
      <div ref={wrapperRef} className={styles.content}>
        <div className={styles.header}>
          <Text className={styles.title} variant="body16" fontWeight="semibold">
            {month}
          </Text>
          {!!total && (
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
