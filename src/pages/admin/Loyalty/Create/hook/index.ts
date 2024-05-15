import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateLoyalty } from '@features/Admin';
import { useUploadImage } from '@features/Image';
import { IFile, ISetFieldValue } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '@shared/constants';

type ValuesType = {
  contact_fio?: string;
  contact_phone?: string;
  company_name?: string;
  title_en?: string;
  title_ru?: string;
  body_en?: string;
  body_ru?: string;
  url?: string;
  company_address?: string;
  discount_value?: string;
  phone_numbers: Array<string>;
  image_id?: number;
};

export const useCreatePage = () => {
  const { t } = useTranslation('loyalty');
  const { create, validate } = useCreateLoyalty();
  const { handleUploadImage, loading: loadingImage } = useUploadImage();
  const navigate = useNavigate();
  const [image, setImage] = useState<IFile>();

  const initialValues: ValuesType = {
    phone_numbers: [],
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await create(body);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_LOYALTY]());
        }
      },
    });

  const handleSetImage = useCallback(
    (file?: IFile) => {
      setImage(file);
      (setFieldValue as ISetFieldValue<ValuesType>)('image_id', file?.id);
    },
    [setFieldValue],
  );

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files.length) {
        const newFile = await handleUploadImage(files[0]);
        if (newFile) {
          handleSetImage(newFile);
        }
      }
    },
    [handleSetImage, handleUploadImage],
  );

  const { getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: IMAGE_TYPES,
    maxSize: 4 * MAX_IMAGE_SIZE,
  });

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    isValid,
    t,
    getInputProps,
    open,
    image,
    handleSetImage,
    loadingImage,
  };
};
