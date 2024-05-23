import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetSecuritySlsIntercomList,
  useRemoveSecurityIntercom,
} from '@features/security';
import { ISelectOption } from '@entities/components';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

export const useSecurityAccessPage = () => {
  const { t } = useTranslation('security');
  const { getData, isLoading, data, total } = useGetSecuritySlsIntercomList();

  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [activeId, setActiveId] = useState<string | number>();

  const [street, setActiveStreet] = useState<ISelectOption | null>(null);
  const [building, setActiveBuilding] = useState<ISelectOption | null>(null);
  const [entrance, setActiveEntrance] = useState<ISelectOption | null>(null);
  const [apartment, setActiveApartment] = useState<ISelectOption | null>(null);

  const { onDelete } = useRemoveSecurityIntercom();

  useEffect(() => {
    getData({
      page,
      perPage,
      street_id: street?.value || undefined,
      building_id: building?.value || undefined,
      entrance_id: entrance?.value || undefined,
      apartment_id: apartment?.value || undefined,
    });
  }, [
    apartment?.value,
    building?.value,
    entrance?.value,
    getData,
    page,
    perPage,
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

  const handleSelectApartment = useCallback((val: ISelectOption | null) => {
    setActiveApartment(val);
  }, []);

  const tableHeader = useTableHeader({
    value: {
      building,
      entrance,
      street,
      apartment,
    },
    onChange: {
      building: handleSelectBuilding,
      entrance: setActiveEntrance,
      street: handleSelectStreet,
      apartment: handleSelectApartment,
    },
  });

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
    handleDelete,
    isModalOpen: isModalOpen && !!activeId,
    handleCloseModal,
    page,
  };
};
