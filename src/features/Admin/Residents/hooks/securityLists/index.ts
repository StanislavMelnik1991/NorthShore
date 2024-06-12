import { useCallback, useEffect, useState } from 'react';
import { useAddAccess, useAddCamera, useAddIntercom } from './add';
import { useGetSecurityList } from './getSecurityList';
import { useRemoveAccess, useRemoveCamera, useRemoveIntercom } from './remove';

export const useGetResidentSecurityLists = () => {
  const [loading, setLoading] = useState(false);
  const {
    getData: getAccessData,
    options: accessOptions,
    selected: accessSelected,
    setSelected: setAccessSelected,
  } = useGetSecurityList('access_points');
  const { update: addAccess } = useAddAccess();
  const { remove: removeAccess } = useRemoveAccess();

  const {
    getData: getCamerasData,
    options: camerasOptions,
    selected: camerasSelected,
    setSelected: setCamerasSelected,
  } = useGetSecurityList('cameras');
  const { update: addCamera } = useAddCamera();
  const { remove: removeCamera } = useRemoveCamera();

  const {
    getData: getIntercomsData,
    options: intercomsOptions,
    selected: intercomsSelected,
    setSelected: setIntercomsSelected,
  } = useGetSecurityList('intercoms');
  const { update: addIntercom } = useAddIntercom();
  const { remove: removeIntercom } = useRemoveIntercom();

  const handleGetData = useCallback(async () => {
    setLoading(true);
    await Promise.all([getAccessData(), getCamerasData(), getIntercomsData()]);
    setLoading(false);
  }, [getAccessData, getCamerasData, getIntercomsData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleAddAccess = useCallback(
    async ({ id, userId }: { userId: number; id: number }) => {
      await addAccess({ user_id: userId, access_point_id: id });
    },
    [addAccess],
  );
  const handleAddIntercom = useCallback(
    async ({ id, userId }: { userId: number; id: number }) => {
      await addIntercom({ user_id: userId, intercom_id: id });
    },
    [addIntercom],
  );
  const handleAddCamera = useCallback(
    async ({ id, userId }: { userId: number; id: number }) => {
      await addCamera({ user_id: userId, camera_id: id });
    },
    [addCamera],
  );

  return {
    loading,
    access: {
      options: accessOptions,
      selected: accessSelected,
      setSelected: setAccessSelected,
      handleAdd: handleAddAccess,
      handleDelete: removeAccess,
    },
    camera: {
      options: camerasOptions,
      selected: camerasSelected,
      setSelected: setCamerasSelected,
      handleAdd: handleAddCamera,
      handleDelete: removeCamera,
    },
    intercom: {
      options: intercomsOptions,
      selected: intercomsSelected,
      setSelected: setIntercomsSelected,
      handleAdd: handleAddIntercom,
      handleDelete: removeIntercom,
    },
  };
};
