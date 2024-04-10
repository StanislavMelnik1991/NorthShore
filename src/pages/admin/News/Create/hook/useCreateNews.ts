import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUploadImage } from "@features/Image/hooks/useUploadImage";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews } from "@entities/types";
import { getRouteAdminNews } from "@shared/constants";

const schema = z
  .object({
    title: z
      .string()
      .min(1, "Поле обязательно для заполнения")
      .max(256, "Заголовок должен быть не длиннее 256 символов"),
    html_content: z.string(),
    cover: z.string().url(),
  })
  .required();

type ValuesType = z.infer<typeof schema>;

export const useCreateNews = () => {
  const [isDraft, setIsDraft] = useState<0 | 1>(0);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();
  const initialValues: ValuesType = {
    title: "",
    html_content: "",
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
        toast.success("Новость создана успешно");
        navigate(getRouteAdminNews());
      } catch (error) {
        console.log(error);
        toast.error("Не удалось создать новость");
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
  };
};
