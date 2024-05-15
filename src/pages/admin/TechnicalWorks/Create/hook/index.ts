import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreateTechWork, useGetStaffList } from '@features/Admin';
import {
  useGetTechnicalWorksNaturesList,
  useGetTechnicalWorksTypesList,
} from '@features/technicalWorks';
import { convertToSeconds } from '@features/utils';
import { ISelectOption } from '@entities/components';
import { ISetFieldValue } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

type Data = {
  title_en?: string;
  title_ru?: string;
  body_en?: string;
  body_ru?: string;
  recipient_groups?: Array<Group>;
  url?: string;
  date_start: Date | null;
  date_end: Date | null;
  type_id?: number;
  nature_id?: number;
  responsible_id?: number;
  need_push?: boolean;
};

type Group = {
  street_id?: number | undefined;
  building_id?: number | undefined;
  entrance_id?: number | undefined;
  apartment_id?: number | undefined;
};

export const useCreateIntercomPage = () => {
  const { t } = useTranslation('technicalWorks');
  const { create, validate } = useCreateTechWork();
  const {
    getData: getTypes,
    isLoading: isTypesLoading,
    options: types,
    selected: selectedType,
    setSelected: setSelectedType,
  } = useGetTechnicalWorksTypesList();
  const {
    getData: getNatures,
    isLoading: isNaturesLoading,
    options: natures,
    selected: selectedNature,
    setSelected: setSelectedNature,
  } = useGetTechnicalWorksNaturesList();
  const {
    getData: getStaff,
    isLoading: isStaffLoading,
    options: staffOptions,
    selected: selectedStaff,
    setSelected: setSelectedStaff,
  } = useGetStaffList();

  useEffect(() => {
    getTypes();
    getNatures();
    getStaff();
  }, [getNatures, getTypes, getStaff]);

  const [isSendToAll, setIsSendToAll] = useState(true);
  const navigate = useNavigate();

  const initialValues: Data = {
    recipient_groups: [],
    date_end: null,
    date_start: null,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid } =
    useFormik<Data>({
      initialValues,
      validate: ({ date_end, date_start, ...body }) => {
        return validate({
          ...body,
          date_end: convertToSeconds(date_end),
          date_start: convertToSeconds(date_start),
        });
      },
      onSubmit: async ({ date_end, date_start, ...body }) => {
        const data = await create({
          ...body,
          date_end: convertToSeconds(date_end),
          date_start: convertToSeconds(date_start),
        });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS]());
        }
      },
    });

  const handleChangeTypeSelection = useCallback(
    (val: unknown) => {
      setSelectedType(val as ISelectOption);
      (setFieldValue as ISetFieldValue<Data>)(
        'type_id',
        (val as ISelectOption | null)?.value,
      );
    },
    [setFieldValue, setSelectedType],
  );
  const handleChangeNatureSelection = useCallback(
    (val: unknown) => {
      setSelectedNature(val as ISelectOption);
      (setFieldValue as ISetFieldValue<Data>)(
        'nature_id',
        (val as ISelectOption | null)?.value,
      );
    },
    [setFieldValue, setSelectedNature],
  );
  const handleChangeStaffSelection = useCallback(
    (val: unknown) => {
      setSelectedStaff(val as ISelectOption);
      (setFieldValue as ISetFieldValue<Data>)(
        'responsible_id',
        (val as ISelectOption | null)?.value,
      );
    },
    [setFieldValue, setSelectedStaff],
  );

  return {
    values,
    errors,
    setFieldValue: setFieldValue as ISetFieldValue<Data>,
    handleSubmit,
    isValid,
    t,
    handleChangeTypeSelection,
    handleChangeNatureSelection,
    isTypesLoading,
    types,
    selectedType,
    isNaturesLoading,
    natures,
    selectedNature,
    isSendToAll,
    setIsSendToAll,
    isStaffLoading,
    staffOptions,
    selectedStaff,
    handleChangeStaffSelection,
  };
};
