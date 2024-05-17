import { useTranslation } from 'react-i18next';
import { TableControls, TableText } from '@entities/components';
import { ILoyalty } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<ILoyalty>;
  onDelete: (id: number) => () => void;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  const { i18n } = useTranslation();
  return data.map(
    ({
      id,
      title,
      contact_fio,
      contact_phone,
      company_name,
      discount_value = '',
    }) => {
      return {
        id: <TableText>{String(id)}</TableText>,
        title: (
          <TableText fontWeight="medium">
            {title[i18n.language as 'en' | 'ru']}
          </TableText>
        ),
        company: <TableText fontWeight="medium">{company_name}</TableText>,
        discount: <TableText fontWeight="medium">{discount_value}</TableText>,
        responsible: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TableText fontWeight="semibold">{contact_fio}</TableText>
            <TableText>{contact_phone}</TableText>
          </div>
        ),
        controls: (
          <TableControls
            getUpdateRoute={AppRoutes[AppRoutesEnum.ADMIN_LOYALTY_UPDATE]}
            onDelete={onDelete(id)}
            rotateIcon={false}
            id={id}
          />
        ),
      };
    },
  );
};
