import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemoveSecurityCamera } from '@features/security';

export const useVideoList = () => {
  const { t } = useTranslation('security');
  const { onDelete } = useRemoveSecurityCamera();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const handleDelete = useCallback(() => {
    if (activeId) {
      onDelete(activeId);
      setIsModalOpen(false);
    }
  }, [activeId, onDelete]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = useCallback(
    (id: string | number) => () => {
      setIsModalOpen(true);
      setActiveId(id);
    },
    [],
  );

  return { t, handleCloseModal, handleOpenModal, handleDelete, isModalOpen };
};
