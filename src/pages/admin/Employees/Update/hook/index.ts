import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateEmployee,
  useGetCurrentEmployee,
  useGetRoles,
  useGetDepartments,
} from '@features/Admin';
import { ISelectOption } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  group_id: number;
  department_id?: number;
  phone_number?: string;
  email?: string;
  role_id?: number;
  job_title?: string;
  work_phone?: string;
  password?: string;
  name?: string;
};

export const useUpdatePage = () => {
  const { t } = useTranslation('employees');
  const { id } = useParams<{ id: string }>();
  const { update } = useUpdateEmployee();
  const [name, setName] = useState<string>();
  const [job_title, setJob_title] = useState<string>();
  const [phone_number, setPhone_number] = useState<string>();
  const [work_phone, setWork_phone] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { getData: getEmployee } = useGetCurrentEmployee(id as string);
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

  const handleGetEmployee = useCallback(async () => {
    const data = await getEmployee();
    if (data) {
      setName(data.name);
      setJob_title(data.job_title);
      setPhone_number(data.phone_number);
      setWork_phone(data.work_phone);
    }
  }, [getEmployee]);

  useEffect(() => {
    handleGetEmployee();
    getRoles();
    getDepartments();
  }, [handleGetEmployee, getRoles, getDepartments]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const body: Data = { group_id: 10 };
    if (name) body.name = name;
    if (job_title) body.job_title = job_title;
    if (phone_number) body.phone_number = phone_number;
    if (work_phone) body.work_phone = work_phone;
    if (password) body.password = password;
    if (selectedRole) body.role_id = selectedRole.value;
    if (selectedDepartment) body.department_id = selectedDepartment.value;
    if (body.department_id === 0) body.department_id = undefined;
    if (body.role_id === 0) body.role_id = undefined;
    const data = await update(
      {
        ...body,
      },
      id as string,
    );
    if (data) {
      navigate(AppRoutes[AppRoutesEnum.EMPLOYEES]());
    }
  };

  const handleChangeRoleSelection = useCallback(
    (val: unknown) => {
      setSelectedRole(val as ISelectOption);
    },
    [setSelectedRole],
  );

  const handleChangeDepartmentSelection = useCallback(
    (val: unknown) => {
      setSelectedDepartment(val as ISelectOption);
    },
    [setSelectedDepartment],
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
    name,
    setName,
    job_title,
    setJob_title,
    phone_number,
    setPhone_number,
    work_phone,
    setWork_phone,
    password,
    setPassword,
  };
};
