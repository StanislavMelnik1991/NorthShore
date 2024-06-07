import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  useCreateEmployee,
  useGetRoles,
  useGetDepartments,
} from '@features/Admin';
import { ISelectOption } from '@entities/components';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type ValuesType = {
  group_id: number;
  department_id?: number;
  phone_number?: string;
  email?: string;
  role_id?: number;
  job_title?: string;
  work_phone?: string;
  password?: string;
  name?: string;
  id_1c?: string;
};

export const useCreatePage = () => {
  const { t } = useTranslation('employees');
  const { create, validate } = useCreateEmployee();
  const {
    getData: getRoles,
    isLoading: isRolesLoading,
    options: rolesOptions,
    selected: selectedRole,
    setSelected: setSelectedRole,
  } = useGetRoles();
  const {
    getData: getDepartments,
    isLoading: isDepartmentsLoading,
    options: departmentsOptions,
    selected: selectedDepartment,
    setSelected: setSelectedDepartment,
  } = useGetDepartments();

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues: { group_id: 10 },
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await create(body);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.EMPLOYEES]());
        }
      },
    });

  useEffect(() => {
    getRoles();
    getDepartments();
  }, [getRoles, getDepartments]);
  const navigate = useNavigate();

  const handleChangeRoleSelection = useCallback(
    (val: unknown) => {
      setSelectedRole(val as ISelectOption);
      (setFieldValue as ISetFieldValue<ValuesType>)(
        'role_id',
        (val as ISelectOption).value,
      );
    },
    [setFieldValue, setSelectedRole],
  );

  const handleChangeDepartmentSelection = useCallback(
    (val: unknown) => {
      setSelectedDepartment(val as ISelectOption);
      (setFieldValue as ISetFieldValue<ValuesType>)(
        'department_id',
        (val as ISelectOption).value,
      );
    },
    [setFieldValue, setSelectedDepartment],
  );

  return {
    handleSubmit,
    t,
    handleChangeRoleSelection,
    handleChangeDepartmentSelection,
    isRolesLoading,
    rolesOptions,
    selectedRole,
    isDepartmentsLoading,
    departmentsOptions,
    selectedDepartment,
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    isValid,
  };
};
