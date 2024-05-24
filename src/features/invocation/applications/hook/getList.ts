import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, ListParams } from '@entities/types';
import { IRequest } from '@entities/types/request.interface';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useGetApplicationsList = (isActual: boolean) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [data, setData] = useState<IRequest[]>([]);

  interface Params extends ListParams {
    isActual: 1 | 0;
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
        const { data } = await axiosApi.get<BaseResponse<Array<IRequest>>>(
          '/applications',
          {
            params,
          },
        );
        if (data.data) {
          setData(data.data);
        } else {
          toast.error(t('toast.notFound'));
        }
      } catch (error) {
        toast.error(t('toast.notFound'));
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
  };
};
