import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateRole, useGetAccessCodesList } from '@features/accessRights';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type DataType = Record<
  string,
  Array<{ id: number; name: string; isSelected: boolean }>
>;

type ValuesType = { name: string; description: string };
export const useSecurityAccessPage = () => {
  const { t } = useTranslation('roles');
  const navigate = useNavigate();
  const [accessCodesList, setAccessCodesList] = useState<DataType>({});
  const { create, validate } = useCreateRole();
  const { getData, isLoading } = useGetAccessCodesList();

  const { values, setFieldValue, errors, handleSubmit, isValid } =
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
        const role = await create({ ...data, access_codes });
        if (role && role.id) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_ROLES]());
        }
      },
    });

  const handleGetAccessCodesList = useCallback(async () => {
    const codes = await getData();
    if (codes) {
      setAccessCodesList(codes);
    } else {
      setAccessCodesList({});
    }
  }, [getData]);

  useEffect(() => {
    handleGetAccessCodesList();
  }, [handleGetAccessCodesList]);

  const changeSelection = useCallback(
    (sectionName: string) => (index: number) => (val: boolean) => {
      const old = { ...accessCodesList };
      old[sectionName][index].isSelected = val;
      setAccessCodesList(old);
    },
    [accessCodesList],
  );

  return {
    t,
    isLoading: isLoading,
    accessCodesList,
    changeSelection,
    values,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    errors,
    handleSubmit,
    isValid,
  };
};
