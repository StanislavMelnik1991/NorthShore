import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { axiosApi } from "@entities/api";
import { BaseResponse, NewsType } from "@entities/types";
import { getRouteUpdateNews } from "@shared/constants";

export const useCreateNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const schema = z
    .object({
      title: z
        .string()
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
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (body) => {
      try {
        const {
          data: { data },
        } = await axiosApi.post<BaseResponse<NewsType>>(`/news/${id}`, body);
        toast.success("Новость обновлена успешно");
        navigate(getRouteUpdateNews(data.id));
      } catch (error) {
        console.log(error);
        toast.error("Не удалось обновить новость");
      }
    },
  });

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get<BaseResponse<NewsType>>(`/news/${id}`)
      .then(({ data: { data } }) => {
        setFieldValue("title", data.title);
        setFieldValue("html_content", data.html_content);
        setFieldValue("is_draft", data.is_draft);
      })
      .catch((err) => {
        console.error(err);
        toast.error("не удалось получить новость");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, setFieldValue]);

  const handleCreateNews = useCallback(
    (is_draft: 0 | 1) => () => {
      setFieldValue("is_draft", is_draft);
      handleSubmit();
    },
    [handleSubmit, setFieldValue],
  );

  return {
    isLoading,
    values,
    errors,
    setFieldValue,
    handleSubmit: handleCreateNews,
  };
};
