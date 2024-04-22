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
  entrance?: IEntranceFull;
  entrance_id?: IEntranceFull['id'];
}
