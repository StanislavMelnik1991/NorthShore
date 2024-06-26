import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDeleteVoting,
  useGetVotingList,
  useUpdateVoting,
  useVotingStatusList,
} from '@features/Admin';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
  status_id?: number;
}

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
    is_deleted,
    toggleIsDeleted,
  } = usePagination();
  const { getData, isLoading, total, data } = useGetVotingList();
  const { deleteVoting } = useDeleteVoting();
  const {
    getData: getVotingList,
    isLoading: isVotingListLoading,
    options,
    selected,
    setSelected,
  } = useVotingStatusList();
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();
  const { update: updateVoting } = useUpdateVoting();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced,
      from: to && from ? from : undefined,
      to: to || undefined,
      status_id: selected?.value,
      is_deleted,
    };
    getData(params);
  }, [
    debounced,
    from,
    getData,
    is_deleted,
    page,
    perPage,
    selected?.value,
    to,
  ]);

  useEffect(() => {
    getVotingList();
  }, [getVotingList]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleChange = (val: [Date | null, Date | null]) => {
    setFrom(val?.[0] || null);
    setTo(val?.[1] || null);
  };

  const tableHeader = useTableHeader({
    from,
    to,
    onChange: handleChange,
    onSelect: setSelected,
    options,
    selected,
    isSelectLoading: isVotingListLoading,
  });

  const handleDelete = useCallback(async () => {
    if (activeId) {
      await deleteVoting(activeId);
      setIsModalOpen(false);
      handleGetData();
    }
  }, [activeId, deleteVoting, handleGetData]);

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

  const handleMarkAsFailed = useCallback(
    (id: number | string) => async () => {
      await updateVoting({ body: { status_id: 3 }, id });
      handleGetData();
    },
    [handleGetData, updateVoting],
  );
  const tableData = useTableRows({
    data,
    onDelete: handleOpenModal,
    onMarkAsFailed: handleMarkAsFailed,
  });

  return {
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    handleToggleIsDeleted: toggleIsDeleted,
    isDeleted: is_deleted,
    perPage,
    setPerPage: handleSetPerPage,
    handleDelete,
    total,
    t,
    tableHeader,
    page,
    tableData,
    handleCloseModal,
    isModalOpen,
  };
};
