import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import {
  useDeleteVoting,
  useGetUserVotingList,
  useUpdateVoting,
} from '@features/Admin';
import { useVotingStatusList } from '@features/Admin/Voting/hooks/getStatusList';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  from?: Date;
  to?: Date;
  status_id?: number;
}

export const useVotingList = () => {
  const { t } = useTranslation();
  const { getData, isLoading, total, data } = useGetUserVotingList();
  const { deleteVoting } = useDeleteVoting();
  const {
    getData: getVotingList,
    isLoading: isVotingListLoading,
    options,
    selected,
    setSelected,
  } = useVotingStatusList();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [debounced] = useDebounce(search, 500);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();
  const { update: updateVoting } = useUpdateVoting();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced.length ? debounced : undefined,
      from: to && from ? from : undefined,
      to: to || undefined,
      status_id: selected?.value,
      is_deleted: isDeleted,
    };
    getData(params);
  }, [debounced, from, getData, isDeleted, page, perPage, selected?.value, to]);

  useEffect(() => {
    getVotingList();
  }, [getVotingList]);

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
