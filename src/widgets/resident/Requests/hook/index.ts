import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCurrentResidentRequests } from '@features/Admin';
import { IRequest } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import { useTableRequestsHeader, useTableRequestsRows } from '../helper';

interface Props {
  id: string | number;
  initialData?: IRequest[];
}

export const useRequests = ({ id, initialData = [] }: Props) => {
  const { t, i18n } = useTranslation('residents');
  const { getData, data } = useGetCurrentResidentRequests({ id, initialData });
  const [openedRequest, setOpenedRequest] = useState<IRequest>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);

  const handleSetOpenedRequest = (id?: string | number) => {
    if (id) {
      const item = data.find((el) => Number(el.id) === Number(id));
      if (item) {
        console.log(item);
        setOpenedRequest(item);
      } else {
        setOpenedRequest(undefined);
      }
    } else {
      setOpenedRequest(undefined);
    }
  };

  const handleGetData = useCallback(
    ({ page, perPage }: { page: number; perPage: number }) => {
      getData({
        page,
        perPage,
      });
    },
    [getData],
  );

  const handleSetPage: (selectedItem: { selected: number }) => void =
    useCallback(
      ({ selected }) => {
        setPage(selected);
        if (selected) {
          handleGetData({ page: selected, perPage });
        }
      },
      [handleGetData, perPage],
    );

  const handleSetPerPage = useCallback(
    (val: number) => {
      setPerPage(val);
      handleGetData({ page: 1, perPage: val });
    },
    [handleGetData],
  );

  const tableRequestsHeader = useTableRequestsHeader();
  const tableRequestsData = useTableRequestsRows({
    data: data.length ? data : initialData,
    getDetails: handleSetOpenedRequest,
  });

  return {
    tableRequestsHeader,
    tableRequestsData,
    page,
    perPage,
    handleSetPage,
    handleSetPerPage,
    t,
    i18n,
    setOpenedRequest: handleSetOpenedRequest,
    openedRequest,
  };
};
