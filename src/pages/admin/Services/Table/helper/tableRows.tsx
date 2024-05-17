import { useTranslation } from 'react-i18next';
import { TableControls, TableText } from '@entities/components';
import { IUserService } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<IUserService>;
  onDelete: (id: number) => () => void;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  const { i18n } = useTranslation();
  return data.map(({ id, title, contact_fio, contact_phone, company_name }) => {
    return {
      id: <TableText>{String(id)}</TableText>,
      title: (
        <TableText fontWeight="medium">
          {title[i18n.language as 'en' | 'ru']}
        </TableText>
      ),
      company: <TableText fontWeight="medium">{company_name}</TableText>,
      responsible: (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TableText fontWeight="semibold">{contact_fio}</TableText>
          <TableText>{contact_phone}</TableText>
        </div>
      ),
      controls: (
        <TableControls
          getUpdateRoute={AppRoutes[AppRoutesEnum.ADMIN_SERVICES_UPDATE]}
          onDelete={onDelete(id)}
          rotateIcon={false}
          id={id}
        />
      ),
    };
  });
};
