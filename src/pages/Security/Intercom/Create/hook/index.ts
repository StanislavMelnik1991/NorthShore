import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateIntercom } from '@features/security';
import { ISelectOption } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  name?: string;
  comment?: string;
  rtsp_url?: string;
  hls_url?: string;
  login?: string;
  password?: string;
  http_login?: string;
  http_password?: string;
  ip_address?: string;
  entrance_id?: number;
  sip_account: ISelectOption | null;
  type: ISelectOption | null;
};

export const useCreateIntercomPage = () => {
  const { create, validate } = useCreateIntercom();
  const { t } = useTranslation('security');
  const navigate = useNavigate();

  const initialValues: Data = {
    type: null,
    sip_account: null,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<Data>({
      initialValues,
      validate: (body) => {
        return validate({
          ...body,
          mp4_url: body.hls_url,
          type_id: body.type?.value,
          sip_account_id: body.sip_account?.value,
        });
      },
      onSubmit: async ({ type, sip_account, ...body }) => {
        const data = await create({
          ...body,
          mp4_url: body.hls_url,
          type_id: type?.value,
          sip_account_id: sip_account?.value,
        });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.SECURITY_INTERCOM]());
        }
      },
    });

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    t,
  };
};
