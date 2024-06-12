import classNames from 'classnames';
import { Pagination, PerPage } from '@entities/components';
import { IResidentNotification } from '@entities/types';
import { Table } from '@shared/ui';
import { useNotificationHistory } from '../hook';
import styles from './NotificationHistory.module.scss';

interface Props {
  className?: string;
  id: number | string;
  initialData?: IResidentNotification[];
  total: number;
}

export const NotificationHistory = ({
  className,
  id,
  initialData,
  total,
}: Props) => {
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    setOpened,
    tableData,
    tableHeader,
  } = useNotificationHistory({ id, initialData });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Table
        config={tableHeader}
        items={tableData}
        handler={(val: string) => setOpened(val)}
      />
      <div className={styles.controls}>
        <PerPage active={perPage} setActive={handleSetPerPage} />
        <Pagination page={page} total={total} onChange={handleSetPage} />
      </div>
    </div>
  );
};
