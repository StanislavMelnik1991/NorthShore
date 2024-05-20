import { useFormik } from 'formik';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmation, useResendCode } from '@features/User';
import { ISetFieldValue } from '@entities/types';
import {
  AppRoutes,
  AppRoutesEnum,
  ROLES_STAFF,
  ResendMethodsEnum,
  ResendReasonsEnum,
} from '@shared/constants';

type ValuesType = {
  phone_code?: string | undefined;
  email_code?: string | undefined;
};

export const useLoginPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { resend } = useResendCode(id);
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { confirm, validate } = useConfirmation(id);

  const { values, errors, setFieldValue, handleSubmit } = useFormik<ValuesType>(
    {
      initialValues: {},
      validate,
      onSubmit: async (body) => {
        const user = await confirm(body);
        if (user) {
          if (ROLES_STAFF.includes(user?.group.id)) {
            navigate(AppRoutes[AppRoutesEnum.ADMIN]());
          } else {
            navigate(AppRoutes[AppRoutesEnum.MAIN]());
          }
        }
      },
    },
  );

  const handleResend = useCallback(() => {
    resend({
      reason: ResendReasonsEnum.Register,
      target_method: ResendMethodsEnum.email,
    });
  }, [resend]);

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    handleSubmit,
    handleResend,
    t,
  };
};
