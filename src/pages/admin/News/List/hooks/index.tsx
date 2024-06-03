import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetUserNewsList } from '@features/news';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { AppRoutes, AppRoutesEnum, NewsStatusEnum } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  status?: keyof typeof NewsStatusEnum;
}

export const useNewsList = () => {
  const { t } = useTranslation('news');
  const {
    handleSetPage,
    handleSetPerPage,
    page,
    perPage,
    debounced,
    search,
    setSearch,
  } = usePagination();
  const { getData, isLoading, total, data } = useGetUserNewsList();
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
  const [status, setStatus] = useState<keyof typeof NewsStatusEnum>();
  const navigate = useNavigate();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      searchValue: debounced,
      status,
    };
    getData(params);
  }, [debounced, getData, page, perPage, status]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.CREATE_NEWS]());
  }, [navigate]);

  const handleToggleStatusFilter = useCallback(() => {
    setStatus((val) => (val ? undefined : 2));
  }, []);

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
    toggleStatusFilter: handleToggleStatusFilter,
    config,
    open,
    setOpen,
  };
};
