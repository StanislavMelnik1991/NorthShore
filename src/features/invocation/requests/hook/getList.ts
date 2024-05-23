import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, ListParams, PaginationResponse } from '@entities/types';
import { IRequest } from '@entities/types/request.interface';
import { INITIAL_PER_PAGE } from '@shared/constants';

interface ResponseDataType extends PaginationResponse {
  results: Array<IRequest>;
}

export const useGetRequestsList = (isActual: boolean) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [data, setData] = useState<Array<IRequest>>([]);

  interface Params extends ListParams {
    isActual: 0 | 1;
  }

  const getData = useCallback(
    async (searchValue?: string) => {
      const params: Params = {
        page,
        perPage,
        searchValue,
        isActual: isActual ? 1 : 0,
      };
      try {
        const {
          data: { data },
        } = await axiosApi.get<BaseResponse<ResponseDataType>>('/requests', {
          params,
        });
        if (data) {
          setData(data.results);
          setTotal(data.total_pages);
        }
      } catch (error) {
        toast.error(t('toast.requestListError'));
        console.error(error);
      }
    },
    [isActual, page, perPage, t],
  );

  const handleSetPerPage = useCallback((val: number) => {
    setPerPage(val);
    setPage(1);
  }, []);

  return {
    getData,
    page,
    setPage,
    perPage,
    setPerPage: handleSetPerPage,
    data,
    total,
  };
};
