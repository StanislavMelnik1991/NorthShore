import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  useCreateAnnouncement,
  useGetDepartmentList,
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
  const {
    data: groupOptions,
    getData,
    isLoading: isOptionsLoading,
  } = useGetDepartmentList();
  const { create, validate } = useCreateAnnouncement();
  const { handleUploadImage } = useUploadImage();
  const { t } = useTranslation('announcements');
  const [groups, setGroups] = useState<Array<ISelectOption>>([]);
  const navigate = useNavigate();

  const initialValues: Data = {
    recipient_groups: [],
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const { values, errors, setFieldValue, handleSubmit, isValid } =
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

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<Data>,
    handleSubmit,
    isValid,
    t,
    groupOptions,
    isOptionsLoading,
    handleChangeGroups,
    groups,
    handleUploadImage,
  };
};
