import classNames from 'classnames';
import { IconClose } from '@shared/icons';
import { Button, Text } from '@shared/ui';
import styles from './EntityNumber.module.scss';

interface Props<T> {
  className?: string;
  isEdit: boolean;
  data: T;
  handleSelect?: ((val: T) => void) | false;
  handleDelete: () => void;
}

export function EntityNumber<T extends { id: string | number }>({
  className,
  data,
  handleSelect,
  isEdit,
  handleDelete,
}: Props<T>) {
  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.edit]: isEdit,
      })}
    >
      <Text
        className={classNames({
          [styles.modalLink]: handleSelect && !isEdit,
        })}
        variant="body14"
        fontWeight="medium"
        onClick={handleSelect ? () => handleSelect(data) : undefined}
      >
        {data.id}
      </Text>
      {isEdit && (
        <Button variant="text" onClick={handleDelete}>
          <IconClose width={20} height={20} />
        </Button>
      )}
    </div>
  );
}
