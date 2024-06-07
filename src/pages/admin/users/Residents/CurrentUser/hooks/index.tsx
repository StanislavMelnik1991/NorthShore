import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetCurrentResident,
  useGetCurrentResidentRequests,
  useGetCurrentResidentNotifications,
  useGetAccessPoints,
  useGetAccessPointsTypes,
} from '@features/Admin';
import { axiosApi } from '@entities/api';
import {
  IRequest,
  IUser,
  ListParams,
  IResidentNotification,
  IAccessPoint,
  SecurityAccess,
  BaseEntity,
  SecurityIntercom,
  SecurityCamera,
  SecuritySlsIntercom,
  BaseResponse,
} from '@entities/types';
import { INITIAL_PER_PAGE, LanguageEnum } from '@shared/constants';
import {
  useTableRequestsHeader,
  useTableRequestsRows,
  useTableNotificationsHeader,
  useTableNotificationsRows,
} from '../helper';

export const useResidentsList = () => {
  const { t, i18n } = useTranslation('residents');
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isAccessPointsLoading, setIsAccessPointsLoading] = useState(false);
  const [isAccessPointsTypesLoading, setIsAccessPointsTypesLoading] =
    useState(false);
  const { getData } = useGetCurrentResident(id as string);
  const { getAccessPoints } = useGetAccessPoints(id as string);
  const { getAccessPointsTypes } = useGetAccessPointsTypes();
  const { getRequestsData, isRequestsLoading, requestsTotal, requestsData } =
    useGetCurrentResidentRequests(id as string);
  const {
    getNotificationsData,
    isNotificationsLoading,
    notificationsTotal,
    notificationsData,
  } = useGetCurrentResidentNotifications(id as string);
  const [open, setOpen] = useState(false);
  const [openedRequest, setOpenedRequest] = useState<IRequest>();
  const [openedNotification, setOpenedNotification] =
    useState<IResidentNotification>();
  const [data, setData] = useState<IUser>();
  const [accessPoints, setAccessPoints] = useState<IAccessPoint>();
  const [accessPointsTypes, setAccessPointsTypes] = useState<BaseEntity[]>();
  const [accessPointType, setAccessPointType] = useState<BaseEntity>();
  const [requestsPage, setRequestsPage] = useState(1);
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [perRequestsPage, setPerRequestsPage] = useState(INITIAL_PER_PAGE);
  const [perNotificationsPage, setPerNotificationsPage] =
    useState(INITIAL_PER_PAGE);
  const [accessPoint, setAccessPoint] = useState<SecurityAccess>();
  const [intercom, setIntercom] = useState<SecurityIntercom>();
  const [camera, setCamera] = useState<SecurityCamera>();
  const [sls, setSls] = useState<SecuritySlsIntercom>();
  const [addType, setAddType] = useState<
    'access point' | 'intercom' | 'camera'
  >();
  const [addNumber, setAddNumber] = useState<number | ''>('');
  const [isUpdate, setIsUpdate] = useState<
    'access point' | 'intercom' | 'camera'
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletebleId, setDeletebleId] = useState<number>();
  const [deletebleTitle, setDeletebleTitle] = useState<string>();
  const [deletebleType, setDeletebleType] = useState<
    'access point' | 'intercom' | 'camera'
  >();

  const handleGetRequestsData = useCallback(async () => {
    const params: ListParams = {
      page: requestsPage,
      perPage: perRequestsPage,
    };
    getRequestsData(params);
  }, [getRequestsData, requestsPage, perRequestsPage]);

  const handleGetNotificationsData = useCallback(async () => {
    const params: ListParams = {
      page: notificationsPage,
      perPage: perNotificationsPage,
    };
    getNotificationsData(params);
  }, [getNotificationsData, notificationsPage, perNotificationsPage]);

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((data) => {
        if (data) {
          setData(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getData]);

  useEffect(() => {
    setIsAccessPointsLoading(true);
    getAccessPoints()
      .then((data) => {
        if (data) {
          setAccessPoints(data);
        }
      })
      .finally(() => {
        setIsAccessPointsLoading(false);
      });
  }, [getAccessPoints]);

  useEffect(() => {
    setIsAccessPointsTypesLoading(true);
    getAccessPointsTypes()
      .then((data) => {
        if (data) {
          setAccessPointsTypes(data);
        }
      })
      .finally(() => {
        setIsAccessPointsTypesLoading(false);
      });
  }, [getAccessPointsTypes]);

  useEffect(() => {
    handleGetRequestsData();
  }, [handleGetRequestsData]);

  useEffect(() => {
    handleGetNotificationsData();
  }, [handleGetNotificationsData]);

  const handleSetRequestsPage: (selectedItem: { selected: number }) => void =
    useCallback(({ selected }) => {
      setRequestsPage(selected + 1);
    }, []);

  const handleSetNotificationsPage: (selectedItem: {
    selected: number;
  }) => void = useCallback(({ selected }) => {
    setNotificationsPage(selected + 1);
  }, []);

  const tableRequestsHeader = useTableRequestsHeader();
  const tableRequestsData = useTableRequestsRows(requestsData);

  const tableNotificationsHeader = useTableNotificationsHeader();
  const tableNotificationsData = useTableNotificationsRows(notificationsData);

  const handleSetOpenedRequest = (id?: string) => {
    if (id) {
      const item = requestsData.find((el) => el.id === +id);
      if (item) {
        setOpenedRequest(item);
      } else {
        setOpenedRequest(undefined);
      }
    } else {
      setOpenedRequest(undefined);
    }
  };

  const handleSetOpenedNotification = (id?: string) => {
    if (id) {
      const item = notificationsData.find((el) => el.id === +id);
      if (item) {
        setOpenedNotification(item);
      } else {
        setOpenedNotification(undefined);
      }
    } else {
      setOpenedNotification(undefined);
    }
  };

  const handleSetAccessPoint = (
    id?: number,
    key?:
      | 'Велобокс'
      | 'Ворота'
      | 'Калитка'
      | 'Колясочная'
      | 'Лапомойка'
      | 'Откатные ворота'
      | 'Подвал'
      | 'Шлагбаум'
      | 'Этаж',
  ) => {
    if (id && key && accessPoints) {
      const item = accessPoints.access_points[key].find((el) => el.id === id);
      if (item) {
        setAccessPoint(item);
      } else {
        setAccessPoint(undefined);
      }
    } else {
      setAccessPoint(undefined);
    }
  };

  const handleSetIntercom = (id?: number) => {
    if (id && accessPoints) {
      const item = accessPoints?.intercoms.find((el) => el.id === id);
      if (item) {
        setIntercom(item);
      } else {
        setIntercom(undefined);
      }
    } else {
      setIntercom(undefined);
    }
  };

  const handleSetCamera = (id?: number) => {
    if (id && accessPoints) {
      const item = accessPoints?.cameras.find((el) => el.id === id);
      if (item) {
        setCamera(item);
      } else {
        setCamera(undefined);
      }
    } else {
      setCamera(undefined);
    }
  };

  const handleSetSls = (id?: number) => {
    if (id && accessPoints) {
      const item = accessPoints?.sls_intercoms.find((el) => el.id === id);
      if (item) {
        setSls(item);
      } else {
        setSls(undefined);
      }
    } else {
      setSls(undefined);
    }
  };

  const handleSetAccessPointType = (id?: number) => {
    if (id !== undefined) {
      const item = accessPointsTypes?.find((el) => el.id === id);
      if (item) {
        setAccessPointType(item);
      } else {
        setAccessPointType(undefined);
      }
    } else {
      setAccessPointType(undefined);
    }
  };

  const handleSetAddType = (type?: 'access point' | 'intercom' | 'camera') => {
    if (type) {
      setAddType(type);
    } else {
      setAddType(undefined);
      setAddNumber('');
      setAccessPointType(undefined);
    }
  };

  const handleAdd = async () => {
    setIsAddLoading(true);
    try {
      if (addType === 'access point') {
        const result = await axiosApi.put<BaseResponse<IAccessPoint>>(
          '/additional_access_points',
          { user_id: id, access_point_id: addNumber },
        );
        if (result && result.data.data) {
          toast.success(t('toast.createSuccess'));
          return result.data.data;
        } else {
          console.error(result);
          toast.error(t('toast.createError'));
        }
      } else if (addType === 'camera') {
        const result = await axiosApi.put<BaseResponse<SecurityCamera>>(
          '/additional_cameras',
          { user_id: id, camera_id: addNumber },
        );
        if (result && result.data.data) {
          toast.success(t('toast.createSuccess'));
          return result.data.data;
        } else {
          console.error(result);
          toast.error(t('toast.createError'));
        }
      } else if (addType === 'intercom') {
        const result = await axiosApi.put<BaseResponse<SecurityIntercom>>(
          '/additional_intercoms',
          { user_id: id, intercom_id: addNumber },
        );
        if (result && result.data.data) {
          toast.success(t('toast.createSuccess'));
          return result.data.data;
        } else {
          console.error(result);
          toast.error(t('toast.createError'));
        }
      }
    } catch (error) {
      toast.error(t('toast.createError'));
    } finally {
      setAddNumber('');
      setAddType(undefined);
      setIsAddLoading(false);
      setIsAccessPointsLoading(true);
      getAccessPoints()
        .then((data) => {
          if (data) {
            setAccessPoints(data);
          }
        })
        .finally(() => {
          setIsAccessPointsLoading(false);
        });
    }
  };

  const handleCloseModal = useCallback(() => {
    setDeletebleId(undefined);
    setDeletebleType(undefined);
    setDeletebleTitle(undefined);
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = (
    id: number,
    type: 'access point' | 'intercom' | 'camera',
    title: string,
  ) => {
    setDeletebleId(id);
    setDeletebleType(type);
    setDeletebleTitle(title);
    setIsModalOpen(true);
  };

  const handleDeleteAdditional = async () => {
    try {
      if (deletebleType === 'access point') {
        await axiosApi.delete<BaseResponse<IAccessPoint>>(
          `/additional_access_point/${deletebleId}`,
        );
        toast.success(t('toast.deleteSuccess'));
      } else if (deletebleType === 'camera') {
        await axiosApi.delete<BaseResponse<SecurityCamera>>(
          `/additional_camera/${deletebleId}`,
        );
        toast.success(t('toast.deleteSuccess'));
      } else if (deletebleType === 'intercom') {
        await axiosApi.delete<BaseResponse<SecurityIntercom>>(
          `/additional_intercom/${deletebleId}`,
        );
        toast.success(t('toast.deleteSuccess'));
      }
    } catch (error) {
      toast.error(t('toast.deleteError'));
    } finally {
      setDeletebleId(undefined);
      setDeletebleType(undefined);
      setDeletebleTitle(undefined);
      setIsModalOpen(false);
      getAccessPoints()
        .then((data) => {
          if (data) {
            setAccessPoints(data);
          }
        })
        .finally(() => {
          setIsAccessPointsLoading(false);
        });
    }
  };

  return {
    t,
    i18n,
    lang: i18n.language as LanguageEnum,
    id,
    isLoading,
    data,
    open,
    setOpen,
    tableRequestsHeader,
    tableRequestsData,
    perRequestsPage,
    setPerRequestsPage,
    requestsTotal,
    setRequestsPage: handleSetRequestsPage,
    isRequestsLoading,
    openedRequest,
    setOpenedRequest: handleSetOpenedRequest,
    tableNotificationsHeader,
    tableNotificationsData,
    perNotificationsPage,
    setPerNotificationsPage,
    notificationsTotal,
    setNotificationsPage: handleSetNotificationsPage,
    isNotificationsLoading,
    openedNotification,
    setOpenedNotification: handleSetOpenedNotification,
    accessPoints,
    isAccessPointsLoading,
    accessPoint,
    setAccessPoint: handleSetAccessPoint,
    intercom,
    setIntercom: handleSetIntercom,
    addType,
    setAddType: handleSetAddType,
    accessPointsTypes,
    isAccessPointsTypesLoading,
    accessPointType,
    setAccessPointType: handleSetAccessPointType,
    addNumber,
    setAddNumber,
    isAddLoading,
    handleAdd,
    isUpdate,
    setIsUpdate,
    handleDeleteAdditional,
    camera,
    setCamera: handleSetCamera,
    sls,
    setSls: handleSetSls,
    isModalOpen,
    handleCloseModal,
    handleOpenModal,
    deletebleTitle,
  };
};
