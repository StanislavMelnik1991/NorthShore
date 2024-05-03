import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateNotification } from '@features/Admin';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useCreatePage = () => {
  const { t } = useTranslation('notifications');
  const { create, validate } = useCreateNotification();
  const navigate = useNavigate();
  const { handleUploadImage, loading } = useUploadImage();
  const [image, setImage] = useState<string>();
  const [isSendToAll, setIsSendToAll] = useState(true);

  type Values = {
    need_push: boolean;
    title_en?: string;
    title_ru?: string;
    body_en?: string;
    body_ru?: string;
    image_id?: number;
    url?: string;
    recipient_groups: {
      street_id?: number | undefined;
      building_id?: number | undefined;
      entrance_id?: number | undefined;
      apartment_id?: number | undefined;
    }[];
  };

  const initialValues: Values = {
    need_push: false,
    recipient_groups: [],
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<Values>({
      initialValues,
      validate: (values) => validate(values),
      onSubmit: async ({ recipient_groups, ...body }) => {
        const data = await create({
          ...body,
          recipient_groups: isSendToAll ? [] : recipient_groups,
        });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_MEETINGS]());
        }
      },
    });

  const onDrop = useCallback(
    async (files: File[]) => {
      if (files.length) {
        const newFile = await handleUploadImage(files[0]);
        if (newFile) {
          setImage(newFile.url);
          setFieldValue('image_id', newFile.id);
        }
      }
    },
    [handleUploadImage, setFieldValue],
  );

  const handleRemoveImage = useCallback(() => {
    setImage(undefined);
    setFieldValue('image_id', undefined);
  }, [setFieldValue]);

  return {
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
    t,
    image,
    onDrop,
    loading,
    handleRemoveImage,
    isSendToAll,
    setIsSendToAll,
  };
};
