import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import {
  useGetTechnicalWorksList,
  useGetTechnicalWorksTypesList,
  useGetTechnicalWorksNaturesList,
  useDeleteTechnicalWork,
  useGetTechnicalWorksStatusesList,
} from '@features/technicalWorks';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  from?: number;
  to?: number;
  status_id?: number;
  type_id?: number;
  nature_id?: number;
}

export const useVotingList = () => {
  const { t } = useTranslation();
  const { getData, isLoading, total, data } = useGetTechnicalWorksList();
  const { handleDelete } = useDeleteTechnicalWork();
  const {
    getData: getTypes,
    isLoading: isTypesLoading,
    options: types,
    selected: selectedType,
    setSelected: setSelectedType,
  } = useGetTechnicalWorksTypesList();
  const {
    getData: getNatures,
    isLoading: isNaturesLoading,
    options: natures,
    selected: selectedNature,
    setSelected: setSelectedNature,
  } = useGetTechnicalWorksNaturesList();
  const {
    getData: getStatuses,
    isLoading: isStatusesLoading,
    options: statuses,
    selected: selectedStatus,
    setSelected: setSelectedStatus,
  } = useGetTechnicalWorksStatusesList();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [debounced] = useDebounce(search, 500);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced.length ? debounced : undefined,
      from: from ? Math.ceil(from.getTime() / 1000) : undefined,
      to: to ? Math.ceil(to.getTime() / 1000) : undefined,
      status_id: selectedStatus?.value,
      nature_id: selectedNature?.value,
      type_id: selectedType?.value,
      is_deleted: isDeleted || undefined,
    };
    getData(params);
  }, [
    debounced,
    from,
    getData,
    isDeleted,
    page,
    perPage,
    selectedNature?.value,
    selectedStatus?.value,
    selectedType?.value,
    to,
  ]);

  useEffect(() => {
    getTypes();
    getNatures();
    getStatuses();
  }, [getNatures, getStatuses, getTypes]);

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

  const handleChangeDate = (val: [Date | null, Date | null]) => {
    setFrom(val?.[0] || null);
    setTo(val?.[1] || null);
  };

  const tableHeader = useTableHeader({
    from,
    to,
    onDateChange: handleChangeDate,
    loading: {
      nature: isNaturesLoading,
      status: isStatusesLoading,
      type: isTypesLoading,
    },
    onChange: {
      nature: setSelectedNature,
      status: setSelectedStatus,
      type: setSelectedType,
    },
    options: {
      nature: natures,
      status: statuses,
      type: types,
    },
    value: {
      nature: selectedNature,
      status: selectedStatus,
      type: selectedType,
    },
  });

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
