export interface IStreet {
  id: number;
  name: string;
}

export interface IBuildingType {
  id: number;
  name: string;
}

export interface IBuilding {
  id: number;
  name: string;
  building_type_id: number;
  comment: string;
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

export interface IEntrance {
  id: number;
  name: string;
  comment: string;
  building_id: IBuildingFull['id'];
}

export interface IEntranceFull extends IEntrance {
  building: IBuildingFull;
}
