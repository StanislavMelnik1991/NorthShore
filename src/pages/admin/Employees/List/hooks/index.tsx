import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetEmployeesList } from '@features/Admin';
import { usePagination } from '@features/pagination';
import { axiosApi } from '@entities/api';
import { ListParams } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Options {
  value: string | number;
  label: string;
}

export const useEmployeesList = () => {
  const { t } = useTranslation('employees');
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    debounced,
    search,
    setSearch,
  } = usePagination();
  const navigate = useNavigate();
  const { getData, isLoading, total, data } = useGetEmployeesList();
  const [lang, setActiveLang] = useState<Options | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState<number>();

  const handleGetData = useCallback(async () => {
    const params: ListParams = {
      page,
      perPage,
      searchValue: debounced,
    };
    getData(params);
  }, [debounced, getData, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData, lang, search]);

  const handleSelectLang = useCallback((val: Options | null) => {
    setActiveLang(val);
  }, []);

  const tableHeader = useTableHeader({
    value: { lang },
    onChange: {
      lang: handleSelectLang,
    },
  });

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setActive(undefined);
  }, []);

  const handleDelete = async () => {
    if (active) {
      try {
        await axiosApi.delete(`/user/${active}`);
        setIsModalOpen(false);
        handleGetData();
      } catch (error) {
        toast.error(t('toast.deleteError'));
      }
    }
  };

  const handleOpenModal = useCallback(
    (id: number) => () => {
      setIsModalOpen(true);
      setActive(id);
    },
    [],
  );

  const tableData = useTableRows(data, handleOpenModal);

  const handleCreateClick = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.EMPLOYEES_CREATE]());
  }, [navigate]);

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
    tableData,
    handleCreateClick,
    isModalOpen,
    handleDelete,
    handleCloseModal,
  };
};
