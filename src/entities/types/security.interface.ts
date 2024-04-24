import { EquipmentCondition } from '@shared/constants';
import { IEntranceFull } from './address.interface';

export interface SecurityAccess {
  id: number;
  name: string;
  ip_address: string;
  type_id: number;
}

export interface SecurityCamera {
  id: number;
  lat: number;
  lon: number;
  name?: string;
  comment?: string;
  type_id: number;
  rtsp_url: string;
  rtsp_url_small: string;
  entrance?: IEntranceFull;
  entrance_id?: IEntranceFull['id'];
  status_id: keyof typeof EquipmentCondition;
}
