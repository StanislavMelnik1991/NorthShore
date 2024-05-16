import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteAdvertisement,
  useGetCurrentAdvertisement,
  useUpdateAdvertisement,
} from '@features/Admin';
import { convertToSeconds } from '@features/utils';
import { IFile, ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type ValuesType = {
  title?: string;
  company_name?: string;
  url?: string;
  image_en_id?: number;
  image_ru_id?: number;
  date_start?: number;
  date_finish?: number;
};

export const useCreatePage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { t } = useTranslation('advertisement');
  const { update, validate } = useUpdateAdvertisement();
  const { getData, isLoading } = useGetCurrentAdvertisement();
  const { handleDelete } = useDeleteAdvertisement();
  const navigate = useNavigate();
  const [imageRu, setImageRu] = useState<IFile>();
  const [imageEn, setImageEn] = useState<IFile>();
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues: ValuesType = {};

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await update({ body, id });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT]());
        }
      },
    });

  const handleSetImageRu = useCallback(
    (file?: IFile) => {
      setImageRu(file);
      (setFieldValue as ISetFieldValue<ValuesType>)('image_ru_id', file?.id);
      if (!imageEn) {
        setImageEn(file);
        (setFieldValue as ISetFieldValue<ValuesType>)('image_en_id', file?.id);
      }
    },
    [imageEn, setFieldValue],
  );

  const handleSetImageEn = useCallback(
    (file?: IFile) => {
      setImageEn(file);
      (setFieldValue as ISetFieldValue<ValuesType>)('image_en_id', file?.id);
      if (!imageRu) {
        setImageRu(file);
        (setFieldValue as ISetFieldValue<ValuesType>)('image_ru_id', file?.id);
      }
    },
    [imageRu, setFieldValue],
  );

  const handleSetDateStart = useCallback(
    (date: Date | null) => {
      setDateStart(date);
      if (date) {
        (setFieldValue as ISetFieldValue<ValuesType>)(
          'date_start',
          convertToSeconds(date),
        );
      } else {
        (setFieldValue as ISetFieldValue<ValuesType>)('date_start', undefined);
      }
    },
    [setFieldValue],
  );

  const handleSetDateEnd = useCallback(
    (date: Date | null) => {
      setDateEnd(date);
      if (date) {
        (setFieldValue as ISetFieldValue<ValuesType>)(
          'date_finish',
          convertToSeconds(date),
        );
      } else {
        (setFieldValue as ISetFieldValue<ValuesType>)('date_finish', undefined);
      }
    },
    [setFieldValue],
  );

  const handleDeleteActive = useCallback(async () => {
    await handleDelete(id);
    setIsModalOpen(false);
    navigate(AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT]());
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
      company_name: oldData?.company_name,
      date_finish: oldData?.date_finish,
      date_start: oldData?.date_start,
      image_en_id: oldData?.image_en_id,
      image_ru_id: oldData?.image_ru_id,
      title: oldData?.title,
      url: oldData?.url,
    });
    if (oldData && oldData.date_start) {
      setDateStart(new Date(oldData.date_start * 1000));
    }
    if (oldData && oldData.date_finish) {
      setDateStart(new Date(oldData.date_finish * 1000));
    }
    if (oldData && oldData.image_en) {
      setImageEn(oldData.image_en);
    }
    if (oldData && oldData.image_ru) {
      setImageRu(oldData.image_ru);
    }
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
    handleSetImageEn,
    handleSetImageRu,
    imageRu,
    imageEn,
    dateStart,
    dateEnd,
    handleSetDateEnd,
    handleSetDateStart,
    isLoading,
    handleCloseModal,
    handleDelete: handleDeleteActive,
    handleOpenModal,
    isModalOpen,
  };
};
