import { useFormik } from "formik";
import { toast } from "react-toastify";
import { z } from "zod";
import { useUser } from "@features/User/hook";
import { axiosApi } from "@entities/api";
import { BaseResponse, ILoginResponse } from "@entities/types";
import { TOKEN_LOCAL_STORAGE_KEY } from "@shared/constants";

export const useLogin = () => {
  const { setUser } = useUser();
  const schema = z
    .object({
      email: z.string().email("Некорректный email"),
      password: z.string().min(4),
    })
    .required();

  type ValuesType = z.infer<typeof schema>;
  const initialValues: ValuesType = {
    email: "",
    password: "",
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
          data: {
            data: { token, ...user },
          },
        } = await axiosApi.post<BaseResponse<ILoginResponse>>(
          "/auth/login",
          body,
        );
        setUser?.(user);
        toast.success(`Добро пожаловать, ${user.name}`);
        localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
      } catch (error) {
        console.log(error);
        toast.error("Ошибка авторизации");
      }
    },
  });

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit,
  };
};
