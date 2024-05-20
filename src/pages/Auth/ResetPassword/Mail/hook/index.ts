import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePasswordResetRequest } from '@features/User';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum, ResendMethodsEnum } from '@shared/constants';

type ValuesType = {
  target?: string;
  target_method?: ResendMethodsEnum;
};

export const useLoginPage = () => {
  const { resend, validate } = usePasswordResetRequest();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const { values, errors, setFieldValue, handleSubmit } = useFormik<ValuesType>(
    {
      initialValues: {
        target_method: ResendMethodsEnum.email,
      },
      validate,
      onSubmit: async (body) => {
        const data = await resend(body);
        if (data && data.id) {
          navigate(AppRoutes[AppRoutesEnum.AUTH_CONFIRM_MAIL](data.id));
        }
      },
    },
  );

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    t,
  };
};
