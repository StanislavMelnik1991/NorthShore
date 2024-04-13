import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetCurrentMeeting,
  useUpdateMeeting,
} from "@features/Admin/Meetings";
import { useUploadImage } from "@features/Image/hooks/useUploadImage";
import { axiosApi } from "@entities/api";
import { getRouteAdminMeeting } from "@shared/constants";

export const useUpdateMeetingPage = () => {
  const { t } = useTranslation("meetings");
  const { id } = useParams<{ id: string }>();
  const { create, validate } = useUpdateMeeting(id as string);
  const { getData } = useGetCurrentMeeting(id as string);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<0 | 1 | 2>(0);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  const initialValues = {
    title_en: " ",
    html_content_ru: " ",
    title_ru: " ",
    html_content_en: " ",
    cover: null,
    target_date: new Date(),
    meeting_link: "",
  };

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validate: (val) => validate({ ...val, status }),
    onSubmit: async (body) => {
      const data = await create({ ...body, status });
      if (data) {
        navigate(getRouteAdminMeeting());
      }
    },
  });

  const handleDelete = useCallback(async () => {
    try {
      await axiosApi.delete(`/news/${id}`);
      navigate(getRouteAdminMeeting());
      toast.success(t("toast.deleteSuccess"));
    } catch (error) {
      console.log(error);
      toast.error(t("toast.deleteError"));
    }
  }, [id, navigate, t]);

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((data) => {
        if (data) {
          setFieldValue("title_ru", data.title.ru);
          setFieldValue("title_en", data.title.en);
          setFieldValue("html_content_en", data.html_content.en);
          setFieldValue("html_content_ru", data.html_content.ru);
          setFieldValue("cover", data.cover || null);
          setFieldValue("target_date", new Date(data.target_date * 1000));
          setFieldValue("meeting_link", data.meeting_link);
          setStatus(data.status || 0);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getData, id, setFieldValue, t]);

  return {
    handleUploadImage,
    status,
    isLoading,
    navigate,
    values,
    errors,
    setFieldValue,
    handleSubmit,
    handleDelete,
    setStatus,
    t,
  };
};
