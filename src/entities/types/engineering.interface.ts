import { WorkModeEnum } from '@shared/constants';
import {
  IApartmentFull,
  IBuildingFull,
  IEntranceFull,
} from './address.interface';
import { BaseEntity } from './global.interface';

export interface IEngineeringType extends BaseEntity {
  measures: string;
}

export interface IEngineering extends BaseEntity {
  apartment_id: BaseEntity['id'];
  charge_status_id: BaseEntity['id'];
  operating_mode_id: BaseEntity['id'];
  type_id: BaseEntity['id'];
  last_check_date?: number;
  current_value?: number;
  voltage?: string;
}

export interface IEngineeringFull extends IEngineering {
  type: IEngineeringType;
  apartment?: IApartmentFull;
  entrance?: IEntranceFull;
  building?: IBuildingFull;
  charge_status: BaseEntity;
  operating_mode: BaseEntity;
}

interface Result {
  timestamp: number;
  current_value: number;
}

export interface IEngineeringResults extends IEngineeringFull {
  results: Array<Result>;
}

export interface IHeatingPoint extends BaseEntity {
  type_id: BaseEntity['id'];
  work_mode: WorkModeEnum;
  alarms: Array<string>;
  building: IBuildingFull;
  building_id: IBuildingFull['id'];
  parameters: HeatingParametersType;
}

export type HeatingParametersType = {
  air_temp: number;
  t_gvs_contour_1: number; //43113
  t_supplied: number; // 43115
  t_reverse: number; // 43116
  t_gvs_reverse_contour_1: number; // 43116
  t_gvs_contour_2: number; //43117
  t_gvs_reverse_contour_2: number; // 43118

  p_contour_2: number; // 43123
  p_contour_1_0: number; // 43124
  p_contour_1_1: number; // 43124
  p_contour_1_2: number; // 43123

  p_delta_contour_2: number; // 43121
  p_delta_contour_1_0: number; // 43121
  p_delta_contour_1_1: number; // 43121

  offset_valve_contour_1: number; // 41601
  offset_valve_contour_2: number; // 41602

  is_pump_open_contour_1: 0 | 1; // 43122
  is_pump_open_contour_1_helper: 0 | 1; // 43122
  is_pump_open_contour_2: 0 | 1; // 43122
  is_pump_open_contour_2_helper: 0 | 1; // 43122
  is_pump_open_contour_1_1: 0 | 1; // 43122
  is_pump_open_contour_1_1_helper: 0 | 1; // 43122

  work_time_pomp_2: number; // 43125
  work_time_pomp_2_helper: number; // 43126

  is_relay_open: 0 | 1; // 43122
};

export interface IElevation extends BaseEntity {
  entrance?: IEntranceFull;
  entrance_id?: IEntranceFull['id'];
  work_mode?: WorkModeEnum;
  alarms?: Array<string>;
  ip_address?: string;
  registry_address?: string;
}
