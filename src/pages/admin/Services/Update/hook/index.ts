import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateService,
  useDeleteService,
  useGetCurrentService,
} from '@features/Admin';
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
  phone_numbers: Array<string>;
  image_id?: number;
};

export const useUpdatePage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { t } = useTranslation('services');
  const { update, validate } = useUpdateService();
  const { getData, isLoading } = useGetCurrentService();

  const { handleUploadImage, loading: loadingImage } = useUploadImage();
  const { handleDelete } = useDeleteService();
  const navigate = useNavigate();
  const [image, setImage] = useState<IFile>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: ValuesType = {
    phone_numbers: [],
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await update({ body, id });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_SERVICES]());
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

  const handleDeleteActive = useCallback(async () => {
    await handleDelete(id);
    setIsModalOpen(false);
    navigate(AppRoutes[AppRoutesEnum.ADMIN_LOYALTY]());
  }, [handleDelete, id, navigate]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleGetData = useCallback(async () => {
    const oldData = await getData(id);
    setValues({
      phone_numbers: oldData?.phone_numbers || [],
      body_en: oldData?.body.en || '',
      body_ru: oldData?.body.ru || '',
      company_address: oldData?.company_address,
      company_name: oldData?.company_name,
      contact_fio: oldData?.contact_fio,
      contact_phone: oldData?.contact_phone,
      image_id: oldData?.image_id,
      title_en: oldData?.title.en || '',
      title_ru: oldData?.title.ru || '',
      url: oldData?.url,
    });
    setImage(oldData?.image);
  }, [getData, id, setValues]);
  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

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
    handleCloseModal,
    handleDelete: handleDeleteActive,
    handleOpenModal,
    isModalOpen,
    isLoading,
  };
};
