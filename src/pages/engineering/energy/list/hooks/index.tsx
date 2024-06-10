import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetEnergyConsumersTypesList,
  useGetBuildingConsumersList,
  useGetChargingStatusesList,
  useGetEnergyStatusesTypesList,
} from '@features/engineering';
import { usePagination } from '@features/pagination';
import { ListParams } from '@entities/types';
import { useTableHeader, useTableRows } from '../helper';

interface Params extends ListParams {
  building_id?: number;
  street_id?: number;
  state_id?: number;
  type_id?: number;
  power_consumer_type_id?: number;
  power_consumer_operating_mode_id?: number;
  power_consumer_charge_status_id?: number;
}

type AddressFilters = { street_id?: number; building_id?: number };

export const useNewsList = () => {
  const { t } = useTranslation('engineering');
  const { handleSetPage, handleSetPerPage, page, perPage } = usePagination();
  const { getData, isLoading, total, data } = useGetBuildingConsumersList();
  const {
    getData: getTypes,
    isLoading: isTypesLoading,
    options: types,
    selected: selectedType,
    setSelected: setSelectedType,
  } = useGetEnergyConsumersTypesList();
  const {
    getData: getStates,
    isLoading: isStatesLoading,
    options: states,
    selected: selectedState,
    setSelected: setSelectedState,
  } = useGetChargingStatusesList();
  const {
    getData: getStatuses,
    isLoading: isStatusesLoading,
    options: statuses,
    selected: selectedStatus,
    setSelected: setSelectedStatus,
  } = useGetEnergyStatusesTypesList();
  const [address, setAddress] = useState<AddressFilters>({});

  const handleGetData = useCallback(async () => {
    const params: Params = {
      page,
      perPage,
      power_consumer_charge_status_id: selectedStatus?.value,
      power_consumer_operating_mode_id: selectedState?.value,
      power_consumer_type_id: selectedType?.value,
      ...address,
    };
    getData(params);
  }, [
    page,
    perPage,
    selectedStatus?.value,
    selectedState?.value,
    selectedType?.value,
    address,
    getData,
  ]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    getStatuses();
    getStates();
    getTypes();
  }, [getStates, getStatuses, getTypes]);

  const handleChangeAddressFilter = useCallback(
    ({ building, street }: { street?: number; building?: number }) => {
      setAddress({ building_id: building, street_id: street });
    },
    [],
  );

  const tableHeader = useTableHeader({
    onChange: {
      state: setSelectedState,
      type: setSelectedType,
      chargingStatus: setSelectedStatus,
    },
    options: {
      state: states,
      type: types,
      chargingStatus: statuses,
    },
    value: {
      state: selectedState,
      type: selectedType,
      chargingStatus: selectedStatus,
    },
    isLoading: {
      state: isStatesLoading,
      type: isTypesLoading,
      chargingStatus: isStatusesLoading,
    },
  });
  const tableData = useTableRows(data);

  return {
    isLoading,
    setPage: handleSetPage,
    perPage,
    setPerPage: handleSetPerPage,
    total,
    t,
    tableHeader,
    tableData,
    page,
    handleChangeAddressFilter,
  };
};
