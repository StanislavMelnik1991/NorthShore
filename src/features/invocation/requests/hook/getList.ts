import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { axiosApi } from '@entities/api';
import { BaseResponse, ListParams } from '@entities/types';
import { IRequest } from '@entities/types/request.interface';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useGetRequestsList = (isActual: boolean) => {
  const { t } = useTranslation('invocation');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [data, setData] = useState<IRequest[]>([]);

  interface Params extends ListParams {
    filter: { isActual: 0 | 1 };
  }

  const getData = useCallback(
    async (searchValue?: string) => {
      const params: Params = {
        page,
        perPage,
        searchValue,
        filter: {
          isActual: isActual ? 1 : 0,
        },
      };
      try {
        const {
          data: { data },
        } = await axiosApi.get<BaseResponse<Array<IRequest>>>('/requests', {
          params,
        });
        setData(data);
      } catch (error) {
        toast.error(t('toast.requestListError'));
        console.error(error);
      }
    },
    [isActual, page, perPage, t],
  );

  return {
    getData,
    page,
    setPage,
    perPage,
    setPerPage,
    data,
    t,
  };
};
