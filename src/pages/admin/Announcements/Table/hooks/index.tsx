import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetAnnouncementsList,
  useRemoveAnnouncement,
} from '@features/announcements';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

export const useNewsList = () => {
  const { t } = useTranslation();
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    debounced,
    search,
    setSearch,
    is_deleted,
    toggleIsDeleted,
  } = usePagination();
  const { getData, isLoading, total, data } = useGetAnnouncementsList();
  const { handleRemove } = useRemoveAnnouncement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const handleGetData = useCallback(async () => {
    const params: ListParams = {
      page,
      perPage,
      searchValue: debounced !== '' ? debounced : undefined,
      is_deleted,
    };
    getData(params);
  }, [debounced, getData, is_deleted, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleDelete = useCallback(async () => {
    if (activeId) {
      await handleRemove(activeId);
      setIsModalOpen(false);
      handleGetData();
    }
  }, [activeId, handleRemove, handleGetData]);

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

  const tableHeader = useTableHeader();
  const tableData = useTableRows({ data, onDelete: handleOpenModal });

  return {
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    perPage,
    setPerPage: handleSetPerPage,
    total,
    t,
    tableHeader,
    page,
    tableData,
    isDeleted: is_deleted,
    toggleIsDeleted,
    handleCloseModal,
    isModalOpen,
    handleDelete,
  };
};
