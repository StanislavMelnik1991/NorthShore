import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useGetAccessPoints,
  useGetCurrentResident,
  useGetCurrentResidentNotifications,
  useGetCurrentResidentRequests,
} from '@features/Admin';
import { useUser } from '@features/User';
import {
  SecurityAccess,
  SecurityIntercom,
  SecurityCamera,
  SecuritySlsIntercom,
} from '@entities/types';
import { INITIAL_PER_PAGE } from '@shared/constants';

export const useResidentsList = () => {
  const { user } = useUser();
  const { t } = useTranslation('residents');
  const { id } = useParams<{ id: string }>() as { id: string };
  const { getData, data, isLoading } = useGetCurrentResident(id);
  const [open, setOpen] = useState(false);
  const [accessPoint, setAccessPoint] = useState<SecurityAccess>();
  const [intercom, setIntercom] = useState<SecurityIntercom>();
  const [camera, setCamera] = useState<SecurityCamera>();
  const [slsIntercom, setSlsIntercom] = useState<SecuritySlsIntercom>();
  const {
    getAccessPoints,
    data: accessData,
    isLoading: isAccessLoading,
  } = useGetAccessPoints(id);
  const {
    getData: getRequestData,
    isLoading: isRequestsLoading,
    data: requests,
    total: requestsTotal,
  } = useGetCurrentResidentRequests({ id });
  const {
    getNotificationsData,
    isNotificationsLoading,
    notificationsTotal,
    notificationsData,
  } = useGetCurrentResidentNotifications({ id });

  useEffect(() => {
    getData();
    getAccessPoints();
    getRequestData({
      page: 1,
      perPage: INITIAL_PER_PAGE,
    });
    getNotificationsData({
      page: 1,
      perPage: INITIAL_PER_PAGE,
    });
  }, [getAccessPoints, getRequestData, getData, getNotificationsData]);

  const securityRights = {
    accessPoint:
      !!user &&
      !!user.role &&
      !!user.role.access_codes.map((el) => el.id).includes(7),
    intercom:
      !!user &&
      !!user.role &&
      !!user.role.access_codes.map((el) => el.id).includes(8),
    video:
      !!user &&
      !!user.role &&
      !!user.role.access_codes.map((el) => el.id).includes(9),
    sls:
      !!user &&
      !!user.role &&
      !!user.role.access_codes.map((el) => el.id).includes(10),
  };

  return {
    t,
    id,
    data,
    open,
    setOpen,
    isLoading,
    accessPoint,
    setAccessPoint,
    intercom,
    setIntercom,
    camera,
    setCamera,
    slsIntercom,
    setSlsIntercom,
    securityRights,
    accessData,
    isAccessLoading,
    requestsTotal,
    isRequestsLoading,
    requests,
    handleUpdate: getAccessPoints,
    notificationsData,
    isNotificationsLoading,
    notificationsTotal,
  };
};
