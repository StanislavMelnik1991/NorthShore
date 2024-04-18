import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateEvent } from '@features/Admin';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useCreateEventsPage = () => {
  const { create, validate } = useCreateEvent();
  const { t } = useTranslation('invocation');
  const [status, setStatus] = useState<0 | 1 | 2>(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  const initialValues = {
    title_en: '',
    html_content_ru: '',
    title_ru: '',
    html_content_en: '',
    cover: null,
    target_date: new Date(),
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } = useFormik({
    initialValues,
    validate: (values) => validate({ ...values, status }),
    onSubmit: async (body) => {
      const data = await create({ ...body, status });
      if (data) {
        navigate(AppRoutes[AppRoutesEnum.ADMIN_EVENTS]());
      }
    },
  });

  return {
    handleUploadImage,
    setIsDraft: setStatus,
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    open,
    setOpen,
    t,
  };
};
