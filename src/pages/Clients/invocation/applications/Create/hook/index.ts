import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { useCreateApplication } from '@features/invocation';
import { IFile } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Data {
  title?: string;
  content?: string;
  contact_fio?: string;
  contact_phone?: string;
  files: IFile[];
}

export const useCreateApplicationPage = () => {
  const { create, validate } = useCreateApplication();
  const { t } = useTranslation('invocation');
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  const initialValues: Data = {
    files: [] as Array<IFile>,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } = useFormik({
    initialValues,
    validate: (values) => validate(values),
    onSubmit: async (body) => {
      const data = await create(body);
      if (data) {
        navigate(AppRoutes[AppRoutesEnum.APPLICATIONS]());
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
