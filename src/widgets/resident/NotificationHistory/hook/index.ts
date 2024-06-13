import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCurrentResidentNotifications } from '@features/Admin';
import { INotification } from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';
import {
  useTableNotificationsHeader,
  useTableNotificationsRows,
} from '../helper';

interface Props {
  id: string | number;
  initialData?: INotification[];
}

export const useNotificationHistory = ({ id, initialData = [] }: Props) => {
  const { t, i18n } = useTranslation('residents');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);

  const {
    getNotificationsData,
    isNotificationsLoading: isLoading,
    notificationsData,
  } = useGetCurrentResidentNotifications({ id, initialData });

  const [active, setActive] = useState<INotification>();

  const handleSetActive = (id?: string | number) => {
    if (id) {
      const item = notificationsData.find((el) => el.id === +id);
      if (item) {
        setActive(item);
      } else {
        setActive(undefined);
      }
    } else {
      setActive(undefined);
    }
  };

  const handleGetData = useCallback(
    ({ page, perPage }: { page: number; perPage: number }) => {
      getNotificationsData({
        page,
        perPage,
      });
    },
    [getNotificationsData],
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

  const tableHeader = useTableNotificationsHeader();
  const tableData = useTableNotificationsRows({
    data: notificationsData.length ? notificationsData : initialData,
    getDetails: handleSetActive,
  });

  return {
    tableHeader,
    tableData,
    isLoading,
    page,
    perPage,
    handleSetPage,
    handleSetPerPage,
    t,
    i18n,
    setActive: handleSetActive,
    active,
  };
};
