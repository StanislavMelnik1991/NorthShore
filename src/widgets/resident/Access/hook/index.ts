import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetResidentSecurityLists } from '@features/Admin';
import { removeDuplicates } from '@features/utils';
import { IAccessPoint } from '@entities/types';
interface Props {
  data?: IAccessPoint;
}

export const useAccess = ({ data }: Props) => {
  const { t } = useTranslation('residents');
  const [isAddCameraOpen, setIsAddCameraOpen] = useState(false);
  const [isAddAccessOpen, setIsAddAccessOpen] = useState(false);
  const [isAddIntercomOpen, setIsAddIntercomOpen] = useState(false);
  const addSecurity = useGetResidentSecurityLists();

  const accessPoints = data
    ? Object.entries(data.access_points)
        .map(([name, data]) => {
          return {
            name,
            data: removeDuplicates(data),
          };
        })
        .filter((el) => !!el.data.length)
    : [];
  const additionalAccessPoints = data
    ? Object.entries(data.additional_access_points)
        .map(([name, data]) => {
          return {
            name,
            data: removeDuplicates(data),
          };
        })
        .filter((el) => !!el.data.length)
    : [];

  return {
    accessPoints,
    additionalAccessPoints,
    intercoms: removeDuplicates(data?.intercoms || []),
    additionalIntercoms: removeDuplicates(data?.additional_intercoms || []),
    cameras: removeDuplicates(data?.cameras || []),
    additionalCameras: removeDuplicates(data?.additional_cameras || []),
    sls_intercoms: removeDuplicates(data?.sls_intercoms || []),
    t,
    isAddCameraOpen,
    setIsAddCameraOpen,
    isAddAccessOpen,
    setIsAddAccessOpen,
    isAddIntercomOpen,
    setIsAddIntercomOpen,
    addSecurity,
  };
};
