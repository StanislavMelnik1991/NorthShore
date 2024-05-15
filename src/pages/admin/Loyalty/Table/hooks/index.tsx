import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { useDeleteLoyalty, useGetLoyaltyList } from '@features/Admin';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {}

export const useVotingList = () => {
  const { t } = useTranslation();
  const { getData, isLoading, total, data } = useGetLoyaltyList();
  const { handleDelete } = useDeleteLoyalty();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [debounced] = useDebounce(search, 500);

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

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

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
