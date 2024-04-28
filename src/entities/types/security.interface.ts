import { EquipmentCondition } from '@shared/constants';
import {
  IEntrance,
  IBuilding,
  IStreet,
  IEntranceFull,
} from './address.interface';
import { SecuritySipAccount } from './sip.interface';

export interface SecurityStatus {
  id: number;
  name: string;
}

export interface SecurityType {
  id: number;
  name: string;
}

export interface SecurityAccess {
  id: number;
  name: string;
  ip_address: string;
  type: SecurityType;
  type_id: SecurityType['id'];
  entrance: IEntrance;
  street: IStreet;
  building: IBuilding;
  address_building_id: IBuilding['id'];
  address_entrance_id: IEntrance['id'];
  address_street_id: IStreet['id'];
  comment: string;
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

export interface SecurityCamera {
  id: number;
  lat: number;
  lon: number;
  name: string;
  comment: string;
  type: SecurityType;
  type_id: SecurityType['id'];
  rtsp_url: string;
  rtsp_url_small: string;
  entrances: Array<IEntranceFull>;
  entrance: IEntrance;
  street: IStreet;
  building: IBuilding;
  address_building_id: IBuilding['id'];
  address_entrance_id: IEntrance['id'];
  address_street_id: IStreet['id'];
  status: SecurityStatus;
  status_id: keyof typeof EquipmentCondition;
}

export interface SecurityIntercom {
  id: number;
  name: string;
  login: string;
  password: string;
  status: SecurityStatus;
  comment: string;
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
