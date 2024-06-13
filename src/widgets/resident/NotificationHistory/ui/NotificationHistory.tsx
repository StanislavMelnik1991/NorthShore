import classNames from 'classnames';
import { formatAddress } from '@features/utils';
import {
  Modal,
  NotificationContent,
  Pagination,
  PerPage,
} from '@entities/components';
import { INotification } from '@entities/types';
import { LanguageEnum } from '@shared/constants';
import { Table } from '@shared/ui';
import { useNotificationHistory } from '../hook';
import styles from './NotificationHistory.module.scss';

interface Props {
  className?: string;
  id: number | string;
  initialData?: INotification[];
  total: number;
  lang: LanguageEnum;
}

export const NotificationHistory = ({
  className,
  id,
  initialData,
  total,
  lang,
}: Props) => {
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    setActive: setOpened,
    tableData,
    tableHeader,
    active,
  } = useNotificationHistory({ id, initialData });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Modal isOpen={!!active} onClose={() => setOpened(undefined)}>
        {active && (
          <NotificationContent
            className={styles.modal}
            createdAt={new Date(active.data_add * 1000)}
            groups={active.recipient_groups.map((el) => formatAddress(el))}
            title={active.title[lang]}
            content={active.body[lang]}
            image={active.image?.url}
            link={active.url}
            needPush={Boolean(active.need_push)}
          />
        )}
      </Modal>

      <Table config={tableHeader} items={tableData} />
      <div className={styles.controls}>
        <PerPage active={perPage} setActive={handleSetPerPage} />
        <Pagination page={page} total={total} onChange={handleSetPage} />
      </div>
    </div>
  );
};
