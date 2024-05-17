import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStaffList, useUpdateTechWork } from '@features/Admin';
import {
  useDeleteTechnicalWork,
  useGetCurrentTechnicalWorks,
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

export const useUpdatePage = () => {
  const { t } = useTranslation('technicalWorks');
  const { id } = useParams<{ id: string }>() as { id: string };
  const { update, validate } = useUpdateTechWork();
  const { handleDelete } = useDeleteTechnicalWork();
  const { getData, isLoading } = useGetCurrentTechnicalWorks();
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendToAll, setIsSendToAll] = useState(true);
  const [initialAccessAddress, setAccessAddress] = useState<
    Array<{
      street?: ISelectOption;
      building?: ISelectOption;
      entrance?: ISelectOption;
      apartment?: ISelectOption;
    }>
  >([]);
  const navigate = useNavigate();

  const initialValues: Data = {
    recipient_groups: [],
    date_end: null,
    date_start: null,
  };

  const { values, errors, setFieldValue, handleSubmit, isValid, setValues } =
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
        const data = await update({
          id,
          body: {
            ...body,
            date_end: convertToSeconds(date_end),
            date_start: convertToSeconds(date_start),
          },
        });
        if (data) {
          navigate(AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS]());
        }
      },
    });

  const handleGetData = useCallback(async () => {
    const [oldData] = await Promise.all([
      getData(id),
      getTypes(),
      getNatures(),
      getStaff(),
    ]);
    if (oldData) {
      const recipient_groups: Array<Group> = oldData.recipient_groups.map(
        ({ apartment, building, entrance, street }) => {
          return {
            apartment_id: apartment?.id,
            building_id: building?.id,
            entrance_id: entrance?.id,
            street_id: street?.id,
          };
        },
      );
      setValues({
        nature_id: oldData.nature_id,
        responsible_id: oldData.responsible_id,
        type_id: oldData.type_id,
        url: oldData.url,
        body_en: oldData.body.en || '',
        body_ru: oldData.body.ru || '',
        title_en: oldData.title.en || '',
        title_ru: oldData.title.ru || '',
        date_end: new Date(oldData.date_end * 1000),
        date_start: new Date(oldData.date_start * 1000),
        recipient_groups,
        need_push: Boolean(oldData.need_push),
      });
      setSelectedNature({
        label: oldData.nature.name,
        value: oldData.nature.id,
      });
      setSelectedType({
        label: oldData.type.name,
        value: oldData.type.id,
      });
      setSelectedStaff({
        label: oldData.responsible.name,
        value: oldData.responsible.id,
      });
      const access = oldData.recipient_groups.map(
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
  }, [
    getData,
    getNatures,
    getStaff,
    getTypes,
    id,
    setSelectedNature,
    setValues,
    setSelectedType,
    setSelectedStaff,
  ]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

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

  const handleDeleteActive = useCallback(async () => {
    await handleDelete(id);
    setIsModalOpen(false);
    navigate(AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS]());
  }, [handleDelete, id, navigate]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isLoading,
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
    initialAccessAddress,
    isModalOpen,
    handleDelete: handleDeleteActive,
    handleCloseModal,
    handleOpenModal,
  };
};
