import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateRole,
  useGetAccessCodesList,
  useGetCurrentRole,
  useRemoveRole,
} from '@features/accessRights';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type DataType = Record<
  string,
  Array<{ id: number; name: string; isSelected: boolean }>
>;

type ValuesType = { name: string; description: string };

export const useSecurityAccessPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { t } = useTranslation('roles');
  const navigate = useNavigate();
  const [accessCodesList, setAccessCodesList] = useState<DataType>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { update, validate } = useUpdateRole(id);
  const { getData, isLoading } = useGetCurrentRole();
  const { onDelete } = useRemoveRole();

  const { getData: getCodeListData, isLoading: isCodeListLoading } =
    useGetAccessCodesList();

  const { values, setFieldValue, errors, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues: {
        name: '',
        description: '',
      },
      validate: (data) => {
        const access_codes = Object.values(accessCodesList)
          .flat(1)
          .filter((el) => el.isSelected)
          .map((el) => el.id);
        return validate({ ...data, access_codes });
      },
      onSubmit: async (data) => {
        const access_codes = Object.values(accessCodesList)
          .flat(1)
          .filter((el) => el.isSelected)
          .map((el) => el.id);
        const role = await update({ ...data, access_codes });
        if (role && role.id) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_ROLES]());
        }
      },
    });

  const handleGetData = useCallback(
    async (id: string) => {
      const [codes, data] = await Promise.all([getCodeListData(), getData(id)]);

      if (data && codes) {
        setValues({
          description: data.description,
          name: data.name,
        });
        data.access_codes.forEach((access) => {
          const existed = codes[access.section_name].find(
            (el) => el.id === access.id,
          );
          if (existed) {
            existed.isSelected = true;
          }
        });
        setAccessCodesList(codes);
      } else {
        navigate(AppRoutes[AppRoutesEnum.ADMIN_ROLES]());
      }
    },
    [getCodeListData, getData, navigate, setValues],
  );

  useEffect(() => {
    handleGetData(id);
  }, [handleGetData, id]);

  const changeSelection = useCallback(
    (sectionName: string) => (index: number) => (val: boolean) => {
      const old = { ...accessCodesList };
      old[sectionName][index].isSelected = val;
      setAccessCodesList(old);
    },
    [accessCodesList],
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(id, values?.name);
    handleCloseModal();
    navigate(AppRoutes[AppRoutesEnum.ADMIN_ROLES]());
  }, [handleCloseModal, id, navigate, onDelete, values?.name]);

  return {
    t,
    isLoading: isCodeListLoading || isLoading,
    accessCodesList,
    changeSelection,
    values,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    errors,
    handleSubmit,
    isValid,
    isModalOpen,
    handleDelete,
    handleCloseModal,
    handleOpenModal,
  };
};
