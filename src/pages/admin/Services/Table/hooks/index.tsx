import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteService, useGetServiceList } from '@features/Admin';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {}

export const useVotingList = () => {
  const { t } = useTranslation();
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    debounced,
    search,
    setSearch,
  } = usePagination();
  const { getData, isLoading, total, data } = useGetServiceList();
  const { handleDelete } = useDeleteService();

  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced.length ? debounced : undefined,
      is_deleted: isDeleted || undefined,
    };
    getData(params);
  }, [debounced, getData, isDeleted, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const tableHeader = useTableHeader();

  const handleDeleteActive = useCallback(async () => {
    if (activeId) {
      await handleDelete(activeId);
      setIsModalOpen(false);
      handleGetData();
    }
  }, [activeId, handleGetData, handleDelete]);

  const handleOpenModal = useCallback(
    (id: number) => () => {
      setIsModalOpen(true);
      setActiveId(id);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const tableData = useTableRows({
    data,
    onDelete: handleOpenModal,
  });

  const handleToggleIsDeleted = useCallback(() => {
    setIsDeleted((val) => !val);
  }, []);

  return {
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    handleToggleIsDeleted,
    isDeleted,
    perPage,
    setPerPage: handleSetPerPage,
    handleDelete: handleDeleteActive,
    total,
    t,
    tableHeader,
    page,
    tableData,
    handleCloseModal,
    isModalOpen,
  };
};
