import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { useCreateRequest } from '@features/invocation';
import { IFile } from '@entities/types';
import { AppRoutes, AppRoutesEnum, RequestThemesEnum } from '@shared/constants';

export const useCreateEventsPage = () => {
  const { create, validate } = useCreateRequest();
  const { t } = useTranslation('invocation');
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  const initialValues = {
    title: '',
    content: '',
    theme_id: undefined as unknown as keyof typeof RequestThemesEnum,
    contact_id: undefined as unknown as number,
    contact_fio: '',
    contact_phone: '',
    files: [] as Array<IFile>,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } = useFormik({
    initialValues,
    validate: (values) => validate(values),
    onSubmit: async (body) => {
      const data = await create(body);
      if (data) {
        navigate(AppRoutes[AppRoutesEnum.REQUESTS]());
      }
    },
  });

  return {
    handleUploadImage,
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    t,
  };
};
