import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUploadImage } from "@features/Image/hooks/useUploadImage";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews } from "@entities/types";
import { getRouteAdminNews } from "@shared/constants";

export const useCreateNews = () => {
  const { t } = useTranslation("events");
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

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validate: (values) => {
      try {
        schema.parse(values);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (body) => {
      try {
        await axiosApi.put<BaseResponse<INews>>("/news", {
          ...body,
          is_draft: isDraft,
        });
        toast.success(t("toast.createSuccess"));
        navigate(getRouteAdminNews());
      } catch (error) {
        console.log(error);
        toast.error(t("toast.createError"));
      }
    },
  });

  return {
    handleUploadImage,
    setIsDraft,
    values,
    errors,
    setFieldValue,
    handleSubmit,
    t,
  };
};
