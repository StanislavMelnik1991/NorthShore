import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetCurrentNews, useUpdateNews } from '@features/Admin';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { axiosApi } from '@entities/api';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useUpdateNewsPage = () => {
  const { t } = useTranslation('news');
  const { id } = useParams<{ id: string }>();
  const { create, validate } = useUpdateNews(id as string);
  const { getData } = useGetCurrentNews(id as string);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<0 | 1 | 2>(0);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  type Values = {
    title_en: string;
    html_content_ru: string;
    title_ru: string;
    html_content_en: string;
    cover: string | null;
  };

  const initialValues: Values = {
    title_en: ' ',
    html_content_ru: ' ',
    title_ru: ' ',
    html_content_en: ' ',
    cover: null,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<Values>({
      initialValues,
      validate: (val) => validate({ ...val, status }),
      onSubmit: async (body) => {
        const data = await create({ ...body, status });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_NEWS]());
        }
      },
    });

  const handleDelete = useCallback(async () => {
    try {
      await axiosApi.delete(`/news/${id}`);
      navigate(AppRoutes[AppRoutesEnum.ADMIN_NEWS]());
      toast.success(t('toast.deleteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(t('toast.deleteError'));
    }
  }, [id, navigate, t]);

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((data) => {
        if (data) {
          const newValues = {
            cover: data.cover || null,
            html_content_en: data.html_content.en,
            html_content_ru: data.html_content.ru,
            title_en: data.title.en,
            title_ru: data.title.ru,
          };
          setValues(newValues);
          setStatus(data.status || 0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getData, setValues]);

  return {
    handleUploadImage,
    status,
    isLoading,
    errors,
    handleSubmit,
    setFieldValue,
    handleDelete,
    setStatus,
    values,
    open,
    isValid,
    setOpen,
    t,
  };
};
