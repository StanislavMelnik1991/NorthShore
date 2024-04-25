import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetSecurityAccessList,
  useOpenSecurityAccess,
  useRemoveSecurityAccess,
} from '@features/security';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Options {
  value: string | number;
  label: string;
}

export const useSecurityAccessPage = () => {
  const { t } = useTranslation('security');
  const { getData, isLoading, data, total } = useGetSecurityAccessList();
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [activeId, setActiveId] = useState<string | number>();

  const [street, setActiveStreet] = useState<Options | null>(null);
  const [building, setActiveBuilding] = useState<Options | null>(null);
  const [entrance, setActiveEntrance] = useState<Options | null>(null);

  const { open } = useOpenSecurityAccess();
  const { onDelete } = useRemoveSecurityAccess();

  useEffect(() => {
    getData({
      page,
      perPage,
      street_id: street?.value || undefined,
      building_id: building?.value || undefined,
      entrance_id: entrance?.value || undefined,
    });
  }, [building?.value, entrance?.value, street?.value, getData, page, perPage]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleOpen = useCallback(
    (id: string | number) => () => {
      open(id);
    },
    [open],
  );
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

  const handleSelectStreet = useCallback((val: Options | null) => {
    setActiveStreet(val);
    setActiveEntrance(null);
    setActiveBuilding(null);
  }, []);

  const handleSelectBuilding = useCallback((val: Options | null) => {
    setActiveEntrance(null);
    setActiveBuilding(val);
  }, []);

  const tableHeader = useTableHeader({
    value: {
      building,
      entrance,
      street,
    },
    onChange: {
      building: handleSelectBuilding,
      entrance: setActiveEntrance,
      street: handleSelectStreet,
    },
  });

  const tableData = useTableRows({
    data,
    onDelete: handleOpenModal,
    onOpen: handleOpen,
  });
  return {
    t,
    isLoading,
    perPage,
    setPage: handleSetPage,
    setPerPage,
    total,
    tableHeader,
    tableData,
    handleDelete,
    isModalOpen: isModalOpen && !!activeId,
    handleCloseModal,
  };
};
