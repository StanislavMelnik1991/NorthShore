import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ISelectOption } from '@entities/components';

interface Props {
  handleUpdate: () => void;
  userId: string | number;
  selected: ISelectOption | null;
  handleAdd: (val: { userId: number; id: number }) => Promise<void>;
  onClose: () => void;
}

export const useAddModal = ({
  handleUpdate,
  userId,
  selected,
  handleAdd,
  onClose,
}: Props) => {
  const { t } = useTranslation('residents');

  const handleAddToUser = useCallback(async () => {
    if (!selected) {
      onClose();
      return;
    }
    await handleAdd({ userId: Number(userId), id: selected.value });
    handleUpdate();
    onClose();
  }, [handleAdd, selected, userId, onClose, handleUpdate]);

  return { t, handleAddToUser };
};
