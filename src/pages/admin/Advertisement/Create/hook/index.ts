import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateAdvertisement } from '@features/Admin';
import { convertToSeconds } from '@features/utils';
import { IFile } from '@entities/types';
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
  const { t } = useTranslation('advertisement');
  const { create, validate } = useCreateAdvertisement();
  const navigate = useNavigate();
  const [imageRu, setImageRu] = useState<IFile>();
  const [imageEn, setImageEn] = useState<IFile>();
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);

  const initialValues: ValuesType = {};

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues,
      validate: (body) => {
        return validate(body);
      },
      onSubmit: async (body) => {
        const data = await create(body);
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT]());
        }
      },
    });

  const handleSetImageRu = useCallback(
    (file?: IFile) => {
      setImageRu(file);
      if (values.image_en_id) {
        setValues({ ...values, image_ru_id: file?.id });
      } else {
        setImageEn(file);
        setValues({ ...values, image_ru_id: file?.id, image_en_id: file?.id });
      }
    },
    [setValues, values],
  );

  const handleSetImageEn = useCallback(
    (file?: IFile) => {
      setImageEn(file);
      if (values.image_ru_id) {
        setValues({ ...values, image_en_id: file?.id });
      } else {
        setImageRu(file);
        setValues({ ...values, image_ru_id: file?.id, image_en_id: file?.id });
      }
    },
    [setValues, values],
  );

  const handleSetDateStart = useCallback(
    (date: Date | null) => {
      setDateStart(date);
      if (date) {
        setValues({ ...values, date_start: convertToSeconds(date) });
      } else {
        setValues({ ...values, date_start: undefined });
      }
    },
    [setValues, values],
  );

  const handleSetDateEnd = useCallback(
    (date: Date | null) => {
      setDateEnd(date);
      if (date) {
        setValues({ ...values, date_finish: convertToSeconds(date) });
      } else {
        setValues({ ...values, date_finish: undefined });
      }
    },
    [setValues, values],
  );
  return {
    values,
    errors,
    setFieldValue,
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
  };
};
