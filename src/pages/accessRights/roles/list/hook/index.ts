import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetRolesList, useRemoveRole } from '@features/accessRights';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

export const useSecurityAccessPage = () => {
  const { t } = useTranslation('roles');
  const { getData, isLoading, data, total } = useGetRolesList();
  const { onDelete } = useRemoveRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState<string | number>();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);

  const handleGetData = useCallback(() => {
    getData({
      page,
      perPage,
    });
  }, [getData, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setActive(undefined);
  }, []);

  const handleOpenModal = useCallback(
    (id: string | number) => () => {
      setIsModalOpen(true);
      setActive(id);
    },
    [],
  );

  const handleDelete = useCallback(() => {
    if (!active) {
      return;
    }
    const activeName = data.find((el) => el.id === Number(active));
    onDelete(active, activeName?.name);
    handleCloseModal();
    handleGetData();
  }, [active, data, handleCloseModal, handleGetData, onDelete]);

  const tableHeader = useTableHeader();

  const tableData = useTableRows({
    data,
    onDelete: handleOpenModal,
  });

  return {
    t,
    isLoading,
    perPage,
    setPage: handleSetPage,
    setPerPage: handleSetPerPage,
    total,
    tableHeader,
    tableData,
    page,
    isModalOpen,
    handleDelete,
    handleCloseModal,
  };
};
