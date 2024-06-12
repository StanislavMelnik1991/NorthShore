import classNames from 'classnames';
import { Modal, ModalDelete } from '@entities/components';
import { IconPlusRounded } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import { useContent } from '../hook';
import styles from './Content.module.scss';
import { EntityNumber } from './EntityNumber';

interface Props<T> {
  className?: string;
  title: string;
  data: Array<{ name: string; data: Array<T> }>;
  handleSelect?: ((val: T) => void) | false;
  handleAdd?: (() => void) | false;
  handleDelete?: (id: string | number) => void | Promise<void>;
}

export function ResidentAccessContent<
  T extends { id: string | number; connect_id?: number },
>({ className, title, data, handleSelect, handleAdd, handleDelete }: Props<T>) {
  const { t, isEdit, isEditable, setIsEdit, deleted, setDeleted } = useContent({
    data,
  });
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Modal isOpen={!!deleted} onClose={() => setDeleted(undefined)}>
        {deleted && (
          <ModalDelete
            text={`${t('remove.delete')} №${deleted}${t('remove.text')}`}
            title={t('remove.title')}
            handleCloseModal={() => setDeleted(undefined)}
            handleDelete={() => {
              handleDelete && handleDelete(deleted);
              setDeleted(undefined);
            }}
          />
        )}
      </Modal>
      <div className={styles.title}>
        <div className={styles.contentWrapper}>
          <Text variant="body14" fontWeight="semibold">
            {title}
          </Text>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {data.map(({ data: elements, name }, index) => {
            return (
              <div
                key={`access-content-${name}-${index}`}
                className={styles.row}
              >
                <div className={styles.contentTitle}>
                  <Text variant="body14" fontWeight="regular">
                    {name}
                  </Text>
                </div>
                {!!elements.length && (
                  <div className={styles.contentRow}>
                    <Text variant="body14" fontWeight="medium">
                      {'№ '}
                    </Text>
                    {elements.map((data, dataIndex) => {
                      return (
                        <div
                          key={`accessPoints-${name}-link-${data.id}`}
                          className={styles.inline}
                        >
                          {!!dataIndex && (
                            <Text variant="body14" fontWeight="medium">
                              {', '}
                            </Text>
                          )}
                          <EntityNumber
                            data={data}
                            isEdit={isEdit}
                            handleSelect={handleSelect}
                            handleDelete={() => setDeleted(data.connect_id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {handleAdd && (
            <Button
              variant="text"
              onClick={handleAdd}
              size="large"
              className={classNames(styles.button, styles.add)}
            >
              <IconPlusRounded width={24} height={24} />
              {t('btns.add')}
            </Button>
          )}
          {isEditable && (
            <Button
              variant="text"
              size="large"
              onClick={() => setIsEdit((val) => !val)}
              className={classNames(styles.button, styles.edit)}
            >
              {isEdit ? t('btns.cancel') : t('btns.change')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
