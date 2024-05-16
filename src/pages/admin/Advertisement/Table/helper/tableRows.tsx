import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TableControls, TableText } from '@entities/components';
import { IAdvertisement } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

interface Props {
  data: Array<IAdvertisement>;
  onDelete: (id: number) => () => void;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  const { t } = useTranslation();
  return data.map(
    ({ id, title, company_name, url, date_start, date_finish }) => {
      return {
        id: <TableText>{String(id)}</TableText>,
        title: <TableText fontWeight="medium">{title}</TableText>,
        company: <TableText fontWeight="medium">{company_name}</TableText>,
        link: (
          <Link target="_blank" to={url || ''}>
            <TableText>{url}</TableText>
          </Link>
        ),
        period: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {date_start && (
              <TableText>{`${t('period.from').toLocaleLowerCase()} ${format(date_start * 1000, 'dd.MM.yyyy')}`}</TableText>
            )}
            {date_finish && (
              <TableText>{`${t('period.to').toLocaleLowerCase()} ${format(date_finish * 1000, 'dd.MM.yyyy')}`}</TableText>
            )}
          </div>
        ),
        controls: (
          <TableControls
            getUpdateRoute={AppRoutes[AppRoutesEnum.ADMIN_ADVERTISEMENT_UPDATE]}
            onDelete={onDelete(id)}
            rotateIcon={false}
            id={id}
          />
        ),
      };
    },
  );
};
