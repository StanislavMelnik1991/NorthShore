export interface IUserShort {
  id: number;
  name: string;
  group: {
    id: number;
    name: string;
  };
  avatar: null;
  childs: Array<IUserShort>;
}
