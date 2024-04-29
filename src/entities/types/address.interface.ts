import { BaseEntity } from './global.interface';
import { SecuritySlsIntercom } from './security.interface';
import { SecuritySipAccount } from './sip.interface';

export interface IStreet extends BaseEntity {}

export interface IBuildingType extends BaseEntity {}

export interface IBuilding extends BaseEntity {
  building_type_id: number;
  lat: string;
  lon: string;
  street_id: IStreet['id'];
  building_type: {
    id: number;
    name: string;
  };
}

export interface IBuildingFull extends IBuilding {
  street: IStreet;
  building_type: IBuildingType;
  building_type_id: IBuildingType['id'];
}

export interface IEntrance extends BaseEntity {
  building_id: IBuildingFull['id'];
}

export interface IEntranceFull extends IEntrance {
  building: IBuildingFull;
}

export interface IApartment extends BaseEntity {
  entrance_id: IEntrance['id'];
  sip_account: SecuritySipAccount;
  sls_intercoms: Array<SecuritySlsIntercom>;
}

export interface IApartmentFull extends IApartment {
  entrance: IEntranceFull;
}
