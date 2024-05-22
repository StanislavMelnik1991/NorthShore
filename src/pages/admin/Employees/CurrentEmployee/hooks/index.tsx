import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCurrentEmployee } from '@features/Admin';
import { axiosApi } from '@entities/api';
import { IEmployee } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useEmployeesList = () => {
  const { t } = useTranslation('employees');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const { getData } = useGetCurrentEmployee(id as string);
  const [data, setData] = useState<IEmployee>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = async () => {
    try {
      await axiosApi.delete(`/users/${id}`);
    } catch (error) {
      toast.error(t('toast.deleteError'));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdateClick = useCallback(() => {
    navigate(AppRoutes[AppRoutesEnum.EMPLOYEES_UPDATE](id as string));
  }, [navigate, id]);

  return {
    t,
    id,
    isLoading,
    data,
    isModalOpen,
    handleDelete,
    handleCloseModal,
    handleOpenModal,
    handleUpdateClick,
  };
};
