import { IApartmentFull } from './address.interface';
import { IUser } from './user.interface';

export interface IResident {
  id: number;
  user_id: number;
  account: string;
  apartment_id: number;
  user: IUser;
  apartment: IApartmentFull;
}

export type IResidentsRequest = {
  count_on_page: number;
  current_page: number;
  total_count: number;
  total_pages: number;
  users: Array<IResident>;
};
