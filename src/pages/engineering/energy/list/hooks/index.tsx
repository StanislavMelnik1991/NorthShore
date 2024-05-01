import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetEnergyList } from '@features/engineering';
import { ListParams } from '@entities/types';
import { AppRoutes, AppRoutesEnum, INITIAL_PER_PAGE } from '@shared/constants';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  building_id?: number;
  entrance_id?: number;
  street_id?: number;
  apartment_id?: number;
  state_id?: number;
  type_id?: number;
}

export const useNewsList = () => {
  const { t } = useTranslation('engineering');
  const { getData, isLoading, total, data } = useGetEnergyList();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const navigate = useNavigate();

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
    };
    getData(params);
  }, [getData, page, perPage]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleCreateClick = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.CREATE_NEWS]());
  }, [navigate]);

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setPage(selected + 1);
    }, []);

  const tableHeader = useTableHeader();
  const tableData = useTableRows(data);

  return {
    handleCreateClick,
    isLoading,
    setPage: handleSetPage,
    perPage,
    setPerPage,
    total,
    t,
    tableHeader,
    tableData,
  };
};
