import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePagination } from '@features/pagination';
import {
  useGetTechnicalWorksList,
  useGetTechnicalWorksTypesList,
  useGetTechnicalWorksNaturesList,
  useDeleteTechnicalWork,
  useGetTechnicalWorksStatusesList,
} from '@features/technicalWorks';
import { ListParams } from '@entities/types';
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

  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | number>();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced,
      from: from ? Math.ceil(from.getTime() / 1000) : undefined,
      to: to ? Math.ceil(to.getTime() / 1000) : undefined,
      status_id: selectedStatus?.value,
      nature_id: selectedNature?.value,
      type_id: selectedType?.value,
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

  return {
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    handleToggleIsDeleted: toggleIsDeleted,
    isDeleted: is_deleted,
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
