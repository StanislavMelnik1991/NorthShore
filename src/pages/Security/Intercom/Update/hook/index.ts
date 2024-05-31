import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCurrentIntercom, useUpdateIntercom } from '@features/security';
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

export const useCreateCameraPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, getData, isLoading } = useGetCurrentIntercom(id as string);
  const { update, validate } = useUpdateIntercom(id as string);
  const [initialAddress, setInitialAddress] = useState<{
    street?: ISelectOption;
    building?: ISelectOption;
    entrance?: ISelectOption;
  }>();

  const { t } = useTranslation('security');
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [getData]);

  const initialValues: Data = {
    type: null,
    sip_account: null,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
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
        const data = await update({
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

  useEffect(() => {
    if (data) {
      setValues({
        comment: data.comment || data.name,
        name: data.name,
        type: { label: data.type?.name, value: data.type?.id },
        http_login: data.http_login,
        http_password: data.http_password,
        ip_address: data.ip_address,
        login: data.login,
        password: data.password,
        sip_account: {
          label: String(data.sip_account?.phone),
          value: data.sip_account?.id,
        },
        entrance_id: data.entrance_id,
        rtsp_url: data.rtsp_url,
        hls_url: data.hls_url || data.mp4_url,
      });

      const address = {
        street: data?.entrance.building.street
          ? {
              value: data?.entrance.building.street.id,
              label: data?.entrance.building.street.name,
            }
          : undefined,
        building: data?.entrance.building
          ? {
              value: data?.entrance.building.id,
              label: data?.entrance.building.name,
            }
          : undefined,
        entrance: data?.entrance
          ? {
              value: data.entrance.id,
              label: data.entrance.name,
            }
          : undefined,
      };
      setInitialAddress(address);
    }
  }, [data, setValues]);

  return {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isValid,
    t,
    isLoading,
    initialAddress,
  };
};
