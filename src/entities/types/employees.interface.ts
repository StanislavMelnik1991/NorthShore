import { IRole } from './roles.interface';
import { IUser } from './user.interface';

export interface IEmployee extends IUser {
  role: IRole | null;
  department: IDepartment | null;
  job_title?: string;
  work_phone?: string;
  login: string;
}

export interface IDepartment {
  id: number;
  name: string;
}

export type IEmployeesRequest = {
  count_on_page: number;
  current_page: number;
  total_count: number;
  total_pages: number;
  users: Array<IEmployee>;
};
