import { useFormik } from "formik";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUploadImage } from "@features/Image/hooks/useUploadImage";
import { axiosApi } from "@entities/api";
import { BaseResponse, INews } from "@entities/types";
import { getRouteUpdateNews } from "@shared/constants";

export const useCreateNews = () => {
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();
  const schema = z
    .object({
      title: z
        .string()
        .min(1, "Поле обязательно для заполнения")
        .max(256, "Заголовок должен быть не длиннее 256 символов"),
      html_content: z.string(),
      is_draft: z.number().int().min(0).max(1),
    })
    .required();

  type ValuesType = z.infer<typeof schema>;
  const initialValues: ValuesType = {
    title: "",
    html_content: "",
    is_draft: 0,
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
        const {
          data: { data },
        } = await axiosApi.put<BaseResponse<INews>>("/news", body);
        toast.success("Новость создана успешно");
        navigate(getRouteUpdateNews(data.id));
      } catch (error) {
        console.log(error);
        toast.error("Не удалось создать новость");
      }
    },
  });

  const handleCreateNews = useCallback(
    (is_draft: 0 | 1) => () => {
      setFieldValue("is_draft", is_draft);
      handleSubmit();
    },
    [handleSubmit, setFieldValue],
  );

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit: handleCreateNews,
    handleUploadImage,
  };
};
