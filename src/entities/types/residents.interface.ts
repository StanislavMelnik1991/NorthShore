import { IUser } from './user.interface';

export interface IResident {
  id: number;
  user_id: number;
  account: string;
  apartment_id: number;
  user: IUser;
  apartment: {
    id: number;
    name: string;
    entrance_id: number;
    comment: string;
    entrance: {
      id: number;
      name: string;
      building_id: number;
      comment: string;
      building: {
        id: number;
        name: string;
        street_id: number;
        building_type_id: number;
        comment: string;
        street: {
          id: number;
          name: string;
        };
      };
    };
  };
}

export type IResidentsRequest = {
  count_on_page: number;
  current_page: number;
  total_count: number;
  total_pages: number;
  users: Array<IResident>;
};
