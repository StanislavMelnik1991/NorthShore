import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateEmployee,
  useGetCurrentEmployee,
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

export const useUpdatePage = () => {
  const { t } = useTranslation('employees');
  const { id } = useParams<{ id: string }>() as { id: string };
  const { update, validate } = useUpdateEmployee();

  const { getData: getEmployee } = useGetCurrentEmployee(id);
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

  const navigate = useNavigate();

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues: { group_id: 10 },
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await update(body, id);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.EMPLOYEES]());
        }
      },
    });

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

  const handleGetEmployee = useCallback(async () => {
    const data = await getEmployee();
    if (data) {
      setValues({ ...data, group_id: data.group.id });
      data.role &&
        handleChangeRoleSelection({
          label: data.role.name,
          value: data.role.id,
        });
      data.department &&
        handleChangeDepartmentSelection({
          label: data.department.name,
          value: data.department.id,
        });
    }
  }, [
    getEmployee,
    handleChangeDepartmentSelection,
    handleChangeRoleSelection,
    setValues,
  ]);

  useEffect(() => {
    handleGetEmployee();
    getRoles();
    getDepartments();
  }, [handleGetEmployee, getRoles, getDepartments]);

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
    setFieldValue,
    isValid,
  };
};
