import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateMeeting } from '@features/Admin/Meetings';
import { useUploadImage } from '@features/Image/hooks/useUploadImage';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useCreateMeetingPage = () => {
  const { t } = useTranslation('meetings');
  const { create, validate } = useCreateMeeting();
  const [status, setStatus] = useState<0 | 1 | 2>(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  type Values = {
    title_en: string;
    html_content_ru: string;
    title_ru: string;
    html_content_en: string;
    cover: string;
    target_date: Date;
    meeting_link: string;
  };

  const initialValues: Values = {
    title_en: '',
    html_content_ru: '',
    title_ru: '',
    html_content_en: '',
    cover: null as unknown as string,
    target_date: new Date(),
    meeting_link: null as unknown as string,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<Values>({
      initialValues,
      validate: (values) => validate({ ...values, status }),
      onSubmit: async (body) => {
        const data = await create({ ...body, status });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_MEETINGS]());
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
