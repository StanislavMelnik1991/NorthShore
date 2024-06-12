import classNames from 'classnames';
import { ISelectOption, Modal, StyledSelect } from '@entities/components';
import { Button, Title } from '@shared/ui';
import { useAddModal } from '../hook';
import styles from './Add.module.scss';

interface Props {
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  options: Array<ISelectOption>;
  onChange: (val: unknown) => void;
  selected: ISelectOption | null;
  title: string;
  userId: string | number;
  handleAdd: (val: { userId: number; id: number }) => Promise<void>;
  handleUpdate: () => void;
}

export const AddModal = ({
  className,
  onClose,
  isOpen,
  onChange,
  options,
  selected,
  title,
  userId,
  handleAdd,
  handleUpdate,
}: Props) => {
  const { t, handleAddToUser } = useAddModal({
    handleAdd,
    handleUpdate,
    onClose,
    selected,
    userId,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={classNames(styles.wrapper, className)}>
        <Title variant="h3" fontWeight="semibold">
          {title}
        </Title>
        <StyledSelect
          placeholder={t('modal.placeholders.number')}
          value={selected}
          options={options}
          onChange={onChange}
          className={styles.select}
        />
        <div className={styles.buttons}>
          <Button
            className={styles.btn}
            variant="primary"
            disabled={!selected}
            onClick={handleAddToUser}
          >
            {t('btns.add')}
          </Button>
          <Button className={styles.btn} variant="secondary" onClick={onClose}>
            {t('btns.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
