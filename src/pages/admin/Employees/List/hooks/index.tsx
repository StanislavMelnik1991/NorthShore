import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { useGetEmployeesList } from '@features/Admin';
import { axiosApi } from '@entities/api';
import { ListParams } from '@entities/types';
import { INITIAL_PER_PAGE, AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Options {
  value: string | number;
  label: string;
}

export const useEmployeesList = () => {
  const { t } = useTranslation('employees');
  const navigate = useNavigate();
  const { getData, isLoading, total, data } = useGetEmployeesList();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [lang, setActiveLang] = useState<Options | null>(null);
  const [debounced] = useDebounce(search, 500);
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

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

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
    setPerPage,
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
