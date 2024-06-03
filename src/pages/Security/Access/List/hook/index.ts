import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePagination } from '@features/pagination';
import {
  useGetSecurityAccessList,
  useOpenSecurityAccess,
  useRemoveSecurityAccess,
} from '@features/security';
import { useAccessTypeList } from '@features/security';
import { ISelectOption } from '@entities/components';
import { useTableHeader, useTableRows } from '../helper';

export const useSecurityAccessPage = () => {
  const { t } = useTranslation('security');
  const { handleSetPage, handleSetPerPage, page, perPage } = usePagination();
  const { getData, isLoading, data, total } = useGetSecurityAccessList();
  const { data: typeLists, getData: getTypeList } = useAccessTypeList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const [type, setType] = useState<ISelectOption | null>(null);
  const [street, setActiveStreet] = useState<ISelectOption | null>(null);
  const [building, setActiveBuilding] = useState<ISelectOption | null>(null);
  const [entrance, setActiveEntrance] = useState<ISelectOption | null>(null);

  const { open } = useOpenSecurityAccess();
  const { onDelete } = useRemoveSecurityAccess();

  useEffect(() => {
    getTypeList();
  }, [getTypeList]);

  const handleGetData = useCallback(() => {
    getData({
      page,
      perPage,
      street_id: street?.value || undefined,
      building_id: building?.value || undefined,
      entrance_id: entrance?.value || undefined,
      type_id: type?.value || undefined,
    });
  }, [
    getData,
    page,
    perPage,
    street?.value,
    building?.value,
    entrance?.value,
    type?.value,
  ]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleOpen = useCallback(
    (id: string | number) => () => {
      const current = data.find((el) => el.id === id);
      open(id, current?.name);
      handleGetData();
    },
    [data, open, handleGetData],
  );
  const handleDelete = useCallback(async () => {
    if (activeId) {
      const active = data.find((val) => val.id === activeId);
      await onDelete(activeId, active?.comment);
      setIsModalOpen(false);
      handleGetData();
    }
  }, [activeId, data, handleGetData, onDelete]);

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

  const handleSelectStreet = useCallback((val: ISelectOption | null) => {
    setActiveStreet(val);
    setActiveEntrance(null);
    setActiveBuilding(null);
  }, []);

  const handleSelectBuilding = useCallback((val: ISelectOption | null) => {
    setActiveEntrance(null);
    setActiveBuilding(val);
  }, []);

  const handleSelectType = useCallback((val: ISelectOption | null) => {
    setType(val);
  }, []);

  const tableHeader = useTableHeader({
    value: {
      building,
      entrance,
      street,
      type,
    },
    onChange: {
      building: handleSelectBuilding,
      entrance: setActiveEntrance,
      street: handleSelectStreet,
      type: handleSelectType,
    },
    options: {
      type: typeLists.map(({ id, name }) => {
        return { value: id, label: name };
      }),
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
    setPage: handleSetPage,
    setPerPage: handleSetPerPage,
    total,
    tableHeader,
    tableData,
    handleDelete,
    isModalOpen: isModalOpen && !!activeId,
    handleCloseModal,
    perPage,
    page,
  };
};
