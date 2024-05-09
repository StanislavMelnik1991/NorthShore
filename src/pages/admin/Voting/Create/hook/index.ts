import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateVoting } from '@features/Admin';
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
};

export const useCreatePage = () => {
  const { t } = useTranslation('voting');
  const { create, validate } = useCreateVoting();
  const navigate = useNavigate();
  const [isSendToAll, setIsSendToAll] = useState(true);

  const initialValues: ValuesType = {
    need_push: false,
    is_archive: true,
    show_result: false,
    recipient_groups: [],
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<ValuesType>({
      initialValues,
      validate: (values) => validate(values),
      onSubmit: async ({ recipient_groups, date_finish, ...body }) => {
        const data = await create({
          ...body,
          recipient_groups: isSendToAll ? [] : recipient_groups,
          date_finish: date_finish || undefined,
        });
        if (data && data.id) {
          navigate(
            AppRoutes[AppRoutesEnum.ADMIN_VOTING_UPDATE_QUESTIONS](data.id),
          );
        }
      },
    });

  return {
    errors,
    handleSubmit,
    setFieldValue: setFieldValue as ISetFieldValue<ValuesType>,
    values,
    isValid,
    t,
    isSendToAll,
    setIsSendToAll,
  };
};
