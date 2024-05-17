import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateAnnouncement,
  useGetDepartmentList,
  useGetCurrentAnnouncement,
  useRemoveAnnouncement,
} from '@features/announcements';
import { useUploadImage } from '@features/Image';
import { ISelectOption } from '@entities/components';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  body?: string;
  title?: string;
  recipient_groups?: Array<Group>;
};

type Group = {
  department_id: number;
};

export const useCreateIntercomPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const {
    data: groupOptions,
    getData: getOptions,
    isLoading: isOptionsLoading,
  } = useGetDepartmentList();
  const { create, validate } = useUpdateAnnouncement(id);
  const { getData, isLoading } = useGetCurrentAnnouncement(id);
  const { handleRemove } = useRemoveAnnouncement();
  const { handleUploadImage } = useUploadImage();
  const { t } = useTranslation('announcements');
  const [groups, setGroups] = useState<Array<ISelectOption>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const initialValues: Data = {
    recipient_groups: [],
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<Data>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await create(body);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS]());
        }
      },
    });

  const handleChangeGroups = useCallback(
    (val: unknown) => {
      setGroups(val as Array<ISelectOption>);
      const recipients: Array<Group> = (val as Array<ISelectOption>).map(
        ({ value }) => ({
          department_id: value,
        }),
      );
      setFieldValue('recipient_groups', recipients);
    },
    [setFieldValue],
  );

  const handleGetData = useCallback(async () => {
    getOptions();
    const data = await getData();
    if (data) {
      const recipients: Array<Group> = data.recipient_groups.map(
        ({ department }) => ({
          department_id: department.id,
        }),
      );
      const groups: Array<ISelectOption> = data.recipient_groups.map(
        ({ department: { id, name } }) => ({ label: name, value: id }),
      );
      setGroups(groups);
      setValues({
        body: data.body,
        title: data.title,
        recipient_groups: recipients,
      });
    }
  }, [getData, getOptions, setValues]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    handleRemove(id);
    setIsModalOpen(false);
    navigate(AppRoutes[AppRoutesEnum.ADMIN_EMPLOYEE_ANNOUNCEMENTS]());
  }, [handleRemove, id, navigate]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<Data>,
    handleSubmit,
    isValid,
    t,
    groupOptions,
    isLoading: isOptionsLoading || isLoading,
    handleChangeGroups,
    groups,
    handleUploadImage,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
    isModalOpen,
  };
};
