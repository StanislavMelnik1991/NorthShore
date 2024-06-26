import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetUserMeetingsList } from '@features/meetings';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

export const useMeetingsList = () => {
  const { getData, isLoading, total, data } = useGetUserMeetingsList();
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
  const { t } = useTranslation('meetings');
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({
    en: {
      created_at: new Date(),
      html: '',
      title: '',
    },
    ru: {
      created_at: new Date(),
      html: '',
      title: '',
    },
  });
  const navigate = useNavigate();

  const handleGetData = useCallback(async () => {
    const params: ListParams = {
      page,
      perPage,
      searchValue: debounced,
      is_deleted,
    };
    getData(params);
  }, [debounced, getData, page, perPage, is_deleted]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.CREATE_MEETINGS]());
  }, [navigate]);

  const handleOpenModal = useCallback(
    (id: string | number) => () => {
      const entity = data.find((el) => el.id === id);
      if (entity) {
        setConfig({
          en: {
            created_at: new Date(),
            html: entity.html_content.en,
            title: entity.title.en,
          },
          ru: {
            created_at: new Date(),
            html: entity.html_content.ru,
            title: entity.title.ru,
          },
        });
        setOpen(true);
      }
    },
    [data],
  );

  const tableHeader = useTableHeader();
  const tableData = useTableRows({ data, handleOpen: handleOpenModal });

  return {
    handleCreateClick,
    search,
    setSearch,
    isLoading,
    setPage: handleSetPage,
    perPage,
    setPerPage: handleSetPerPage,
    total,
    t,
    status,
    tableHeader,
    page,
    tableData,
    toggleStatusFilter: toggleIsDeleted,
    config,
    open,
    setOpen,
  };
};
