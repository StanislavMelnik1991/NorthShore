import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import {
  useGetAnnouncementsList,
  useRemoveAnnouncement,
} from '@features/announcements';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

export const useNewsList = () => {
  const { t } = useTranslation();
  const { getData, isLoading, total, data } = useGetAnnouncementsList();
  const { handleRemove } = useRemoveAnnouncement();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [isDeleted, setIsDeleted] = useState(false);
  const [debounced] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const handleGetData = useCallback(async () => {
    const params: ListParams = {
      page,
      perPage,
      searchValue: debounced !== '' ? debounced : undefined,
      is_deleted: isDeleted || undefined,
    };
    getData(params);
  }, [debounced, getData, isDeleted, page, perPage]);

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

  const handleToggleIsDeleted = useCallback(() => {
    setIsDeleted((val) => !val);
  }, []);

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
    isDeleted,
    toggleIsDeleted: handleToggleIsDeleted,
    handleCloseModal,
    isModalOpen,
    handleDelete,
  };
};
