import classNames from 'classnames';
import { Modal, Pagination, PerPage } from '@entities/components';
import { IRequest } from '@entities/types';
import {
  IconAccepted,
  IconClosed,
  IconDone,
  IconNew,
  IconPassed,
  IconStaple,
} from '@shared/icons';
import { Badge, Table, Text } from '@shared/ui';
import { useRequests } from '../hook';
import styles from './Requests.module.scss';

interface Props {
  className?: string;
  id: string | number;
  total: number;
  initialData?: IRequest[];
}

export const ResidentRequests = ({
  className,
  id,
  total,
  initialData,
}: Props) => {
  const {
    tableRequestsData,
    tableRequestsHeader,
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    t,
    i18n,
    setOpenedRequest,
    openedRequest,
  } = useRequests({ id, initialData });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Modal
        isOpen={!!openedRequest}
        onClose={() => setOpenedRequest(undefined)}
      >
        {openedRequest && (
          <div className={styles.modal}>
            <div className={styles.bages}>
              <Badge color="white">
                {new Date(openedRequest.data_add).toLocaleDateString(
                  i18n.language,
                  {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  },
                )}
              </Badge>
              <Badge color="blue">{openedRequest.theme.name}</Badge>
            </div>
            <Text
              className={styles.request_title}
            >{`${t('modal.request')} ${'№' + openedRequest?.id}`}</Text>
            {openedRequest.title && (
              <Text className={styles.request_subtitle}>
                {openedRequest.title}
              </Text>
            )}
            <Text
              className={classNames(styles.status_raw, {
                [styles.gray]: openedRequest.status?.id === 5,
                [styles.green]:
                  openedRequest.status?.id === 3 ||
                  openedRequest.status?.id === 4,
                [styles.primary]: openedRequest.status.id === 1,
                [styles.orange]: openedRequest.status.id === 2,
              })}
            >
              {openedRequest.status?.id === 1 && <IconNew />}
              {openedRequest.status?.id === 2 && <IconPassed />}
              {openedRequest.status?.id === 3 && <IconAccepted />}
              {openedRequest.status?.id === 4 && <IconDone />}
              {openedRequest.status?.id === 5 && <IconClosed />}
              {openedRequest.status.name}
            </Text>
            <Text variant="body16">{openedRequest.content}</Text>
            {openedRequest && openedRequest.files.length > 0 && (
              <div className={styles.modal__image_wrapper}>
                <IconStaple />
                {openedRequest.files.map((elem, i) => (
                  <div
                    className={styles.modal__image}
                    key={'item' + i}
                    style={{ background: `url(${elem.url})` }}
                  ></div>
                ))}
              </div>
            )}
            {openedRequest.comment && (
              <div className={styles.comment__wrapper}>
                <Text className={styles.commnt__title}>
                  {t('modal.comment')}
                </Text>
                <Text variant="body16">{openedRequest.comment}</Text>
              </div>
            )}
          </div>
        )}
      </Modal>
      <Table config={tableRequestsHeader} items={tableRequestsData} />
      <div className={styles.controls}>
        <PerPage active={perPage} setActive={handleSetPerPage} />
        <Pagination page={page} total={total} onChange={handleSetPage} />
      </div>
    </div>
  );
};
