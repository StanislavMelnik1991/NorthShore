import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState<0 | 1>(0);
  const navigate = useNavigate();
  const { handleUploadImage } = useUploadImage();

  const initialValues: ValuesType = {
    title: " ",
    html_content: "",
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
        toast.success("Новость обновлена успешно");
        navigate(getRouteAdminNews());
      } catch (error) {
        console.log(error);
        toast.error("Не удалось обновлена новость");
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
        toast.success("Новость обновлена успешно");
        navigate(getRouteAdminNews());
      } catch (error) {
        console.log(error);
        toast.error("Не удалось обновлена новость");
      }
    },
    [id, isDraft, navigate, values],
  );

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
        toast.error("не удалось получить новость");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, setFieldValue]);

  return {
    handleUploadImage,
    setIsDraft,
    isDraft,
    isLoading,
    navigate,
    values,
    errors,
    setFieldValue,
    handleSubmit,
  };

  /* const { handleUploadImage } = useUploadImage();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
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
    title: " ",
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
        } = await axiosApi.post<BaseResponse<INews>>(`/news/${id}`, body);
        toast.success("Новость обновлена успешно");
        navigate(getRouteUpdateNews(data.id));
      } catch (error) {
        console.error(error);
        toast.error("Не удалось обновить новость");
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
    isLoading,
    values,
    errors,
    setFieldValue,
    handleSubmit: handleCreateNews,
    handleUploadImage,
  }; */
};
