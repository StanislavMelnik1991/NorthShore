import { IApartmentFull } from './address.interface';
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
  apartment: IApartmentFull;
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
