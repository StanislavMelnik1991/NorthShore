import { EquipmentCondition } from '@shared/constants';
import {
  IEntrance,
  IBuilding,
  IStreet,
  IEntranceFull,
  IApartment,
  IApartmentFull,
} from './address.interface';
import { BaseEntity } from './global.interface';
import { SecuritySipAccount } from './sip.interface';

export interface SecurityStatus extends BaseEntity {}

export interface SecurityType extends BaseEntity {}

export interface SecurityAccess extends BaseEntity {
  ip_address: string;
  type: SecurityType;
  type_id: SecurityType['id'];
  entrance: IEntrance;
  street: IStreet;
  building: IBuilding;
  address_building_id: IBuilding['id'];
  address_entrance_id: IEntrance['id'];
  address_street_id: IStreet['id'];
  entrances: Array<IEntranceFull>;
  status: SecurityStatus;
  current_status_id: SecurityStatus['id'];
  http_login: string;
  http_password: string;
  lat: number;
  lon: number;
  login: string;
  password: string;
}

export interface SecurityCamera extends BaseEntity {
  lat: number;
  lon: number;
  type: SecurityType;
  type_id: SecurityType['id'];
  rtsp_url: string;
  rtsp_url_small: string;
  entrances: Array<IEntranceFull>;
  entrances_ids: Array<number>;
  entrance: IEntrance;
  street: IStreet;
  building: IBuilding;
  address_building_id: IBuilding['id'];
  address_entrance_id: IEntrance['id'];
  address_street_id: IStreet['id'];
  status: SecurityStatus;
  status_id: keyof typeof EquipmentCondition;
}

export interface SecurityIntercom extends BaseEntity {
  login: string;
  password: string;
  status: SecurityStatus;
  mp4_url?: string;
  hls_url?: string;
  type: SecurityType;
  type_id: SecurityType['id'];
  entrance: IEntranceFull;
  entrances: Array<IEntranceFull>;
  rtsp_url: string;
  http_login: string;
  http_password: string;
  ip_address: string;
  entrance_id: number;
  sip_account: SecuritySipAccount;
  current_status_id: number;
}

export interface SecuritySlsIntercom extends BaseEntity {
  uuid: string;
  data_add: number;
  apartment: IApartmentFull;
  apartment_id: IApartment['id'];
}
