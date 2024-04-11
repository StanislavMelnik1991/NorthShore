import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUploadImage } from "@features/Image/hooks/useUploadImage";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews } from "@entities/types";
import { getRouteAdminEvents } from "@shared/constants";

export const useCreateNews = () => {
  const { t } = useTranslation("events");
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState<0 | 1>(0);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  const schema = z
    .object({
      title_en: z
        .string()
        .min(1, t("errors.required"))
        .max(256, t("errors.max256")),
      title_ru: z
        .string()
        .min(1, t("errors.required"))
        .max(256, t("errors.max256")),
      html_content_en: z.string(),
      html_content_ru: z.string(),
      cover: z.string().url(),
    })
    .required();

  type ValuesType = z.infer<typeof schema>;

  const initialValues: ValuesType = {
    title_en: "",
    html_content_ru: "",
    title_ru: "",
    html_content_en: "",
    cover: "",
  };

  const { values, errors, setFieldValue } = useFormik({
    initialValues,
    validate: (values) => {
      try {
        schema.parse(values);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async () => {
      try {
        await axiosApi.post<BaseResponse<INews>>(`/news/${id}`, {
          ...values,
          is_draft: isDraft,
        });
        toast.success(t("toast.updateSuccess"));
        navigate(getRouteAdminEvents());
      } catch (error) {
        console.log(error);
        toast.error(t("toast.updateError"));
      }
    },
  });

  const handleSubmit = useCallback(
    async (is_draft: 0 | 1 = isDraft) => {
      try {
        await axiosApi.post<BaseResponse<INews>>(`/news/${id}`, {
          ...values,
          is_draft,
        });
        toast.success(t("toast.updateSuccess"));
        navigate(getRouteAdminEvents());
      } catch (error) {
        console.log(error);
        toast.error(t("toast.updateError"));
      }
    },
    [id, isDraft, navigate, t, values],
  );

  const handleDelete = useCallback(async () => {
    try {
      await axiosApi.delete(`/news/${id}`);
      navigate(getRouteAdminEvents());
      toast.success(t("toast.deleteSuccess"));
    } catch (error) {
      console.log(error);
      toast.error(t("toast.deleteError"));
    }
  }, [id, navigate, t]);

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get<BaseResponse<INews>>(`/news/${id}`)
      .then(({ data: { data } }) => {
        setFieldValue("title", data.title);
        setFieldValue("html_content", data.html_content);
        setFieldValue("cover", data.cover);
        setIsDraft(data.is_draft);
      })
      .catch((err) => {
        console.error(err);
        toast.error(t("toast.notFound"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, setFieldValue, t]);

  return {
    handleUploadImage,
    isDraft,
    isLoading,
    navigate,
    values,
    errors,
    setFieldValue,
    handleSubmit,
    handleDelete,
    t,
  };
};
