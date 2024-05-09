import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetSecurityIntercomList,
  useIntercomStatusList,
  useOpenSecurityIntercom,
  useRemoveSecurityIntercom,
} from '@features/security';
import { ISelectOption } from '@entities/components';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

export const useSecurityAccessPage = () => {
  const { t } = useTranslation('security');
  const { getData, isLoading, data, total } = useGetSecurityIntercomList();
  const { data: statusData, getData: getStatusData } = useIntercomStatusList();

  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [activeId, setActiveId] = useState<string | number>();

  const [street, setActiveStreet] = useState<ISelectOption | null>(null);
  const [building, setActiveBuilding] = useState<ISelectOption | null>(null);
  const [entrance, setActiveEntrance] = useState<ISelectOption | null>(null);
  const [status, setStatus] = useState<ISelectOption | null>(null);

  const { open } = useOpenSecurityIntercom();
  const { onDelete } = useRemoveSecurityIntercom();

  useEffect(() => {
    getStatusData();
  }, [getStatusData]);

  useEffect(() => {
    getData({
      page,
      perPage,
      street_id: street?.value || undefined,
      building_id: building?.value || undefined,
      entrance_id: entrance?.value || undefined,
      status_id: status?.value || undefined,
    });
  }, [
    building?.value,
    entrance?.value,
    getData,
    page,
    perPage,
    status?.value,
    street?.value,
  ]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

  const handleOpen = useCallback(
    (id: string | number) => () => {
      open(id);
    },
    [open],
  );
  const handleDelete = useCallback(async () => {
    if (activeId) {
      const active = data.find((val) => val.id === activeId);
      await onDelete(activeId, active?.comment);
      setIsModalOpen(false);
      getData({
        page,
        perPage,
        street_id: street?.value || undefined,
        building_id: building?.value || undefined,
        entrance_id: entrance?.value || undefined,
      });
    }
  }, [
    activeId,
    building?.value,
    data,
    entrance?.value,
    getData,
    onDelete,
    page,
    perPage,
    street?.value,
  ]);

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

  const handleSelectStatus = useCallback((val: ISelectOption | null) => {
    setStatus(val);
  }, []);

  const tableHeader = useTableHeader({
    value: {
      building,
      entrance,
      street,
      status,
    },
    onChange: {
      building: handleSelectBuilding,
      entrance: setActiveEntrance,
      street: handleSelectStreet,
      status: handleSelectStatus,
    },
    options: {
      status: statusData.map(({ id, name }) => {
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
    perPage,
    setPage: handleSetPage,
    setPerPage: handleSetPerPage,
    total,
    tableHeader,
    tableData,
    handleDelete,
    isModalOpen: isModalOpen && !!activeId,
    handleCloseModal,
    page,
  };
};
