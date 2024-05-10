import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCurrentVoting, useUpdateVoting } from '@features/Admin';
import { ISelectOption } from '@entities/components';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Group = {
  street_id?: number;
  building_id?: number;
  entrance_id?: number;
  apartment_id?: number;
};

type ValuesType = {
  title_en?: string;
  title_ru?: string;
  body_en?: string;
  body_ru?: string;
  need_push: boolean;
  is_archive: boolean;
  date_finish?: Date | null;
  show_result: boolean;
  recipient_groups: Array<Group>;
  status_id?: number;
};

export const useUpdatePage = () => {
  const { t } = useTranslation('voting');
  const { id } = useParams<{ id: string }>();
  const { update, validate } = useUpdateVoting();
  const { getData, isLoading } = useGetCurrentVoting(id as string);
  const navigate = useNavigate();
  const [isSendToAll, setIsSendToAll] = useState(true);
  const [initialAccessAddress, setAccessAddress] = useState<
    Array<{
      street?: ISelectOption;
      building?: ISelectOption;
      entrance?: ISelectOption;
      apartment?: ISelectOption;
    }>
  >([]);

  const initialValues: ValuesType = {
    need_push: false,
    is_archive: false,
    show_result: false,
    recipient_groups: [],
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
    useFormik<ValuesType>({
      initialValues,
      validate: (values) => validate(values),
      onSubmit: async ({ recipient_groups, date_finish, ...body }) => {
        const data = await update({
          body: {
            ...body,
            recipient_groups: isSendToAll ? [] : recipient_groups,
            date_finish: date_finish || undefined,
          },
          id: id as string,
        });
        if (data && data.id && String(data.id) === String(id)) {
          navigate(
            AppRoutes[AppRoutesEnum.ADMIN_VOTING_UPDATE_QUESTIONS](data.id),
          );
        }
      },
    });

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        if (data.status.id !== 1) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_VOTING_CURRENT](data.id));
        }
        const {
          recipient_groups,
          date_finish,
          is_archive,
          need_push,
          body,
          title,
        } = data;
        const groups = recipient_groups.map(
          ({ apartment, building, entrance, street }) => {
            return {
              street_id: street?.id,
              building_id: building?.id,
              entrance_id: entrance?.id,
              apartment_id: apartment?.id,
            };
          },
        );
        setValues({
          need_push: Boolean(need_push),
          is_archive: Boolean(is_archive),
          date_finish: new Date(date_finish * 1000),
          show_result: true,
          recipient_groups: groups,
          body_en: body.en || undefined,
          body_ru: body.ru || undefined,
          title_en: title.en || undefined,
          title_ru: title.ru || undefined,
        });
        const access = data.recipient_groups.map(
          ({ apartment, building, entrance, street }) => {
            return {
              street: street
                ? { value: street?.id, label: street?.name }
                : undefined,
              building: building
                ? { value: building?.id, label: building?.name }
                : undefined,
              entrance: entrance
                ? { value: entrance?.id, label: entrance?.name }
                : undefined,
              apartment: apartment
                ? { value: apartment?.id, label: apartment?.name }
                : undefined,
            };
          },
        );
        setAccessAddress(access);
        setIsSendToAll(!access.length);
      }
    });
  }, [getData, navigate, setValues]);

  return {
    errors,
    handleSubmit,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    values,
    isValid,
    t,
    isSendToAll,
    setIsSendToAll,
    initialAccessAddress,
    isLoading,
  };
};
