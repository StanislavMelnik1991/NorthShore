import { TableControls, TableText } from '@entities/components';
import { IRole } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<IRole>;
  onDelete: (id: number) => () => Promise<void> | void;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  return data.map(({ id, name, users, description }) => {
    const staff = users.map((el) => el.name).join(', ');
    return {
      roles: <TableText>{name}</TableText>,
      description: <TableText>{description}</TableText>,
      staff: <TableText>{staff}</TableText>,
      controls: (
        <TableControls
          getUpdateRoute={AppRoutes[AppRoutesEnum.ADMIN_ROLES_UPDATE]}
          onDelete={onDelete(id)}
          id={id}
        />
      ),
    };
  });
};
