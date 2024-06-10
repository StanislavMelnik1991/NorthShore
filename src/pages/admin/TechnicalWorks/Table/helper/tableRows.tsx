import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { formatAddress } from '@features/utils';
import { TableControls, TableText } from '@entities/components';
import { ITechWork } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Badge } from '@shared/ui';

interface Props {
  data: Array<ITechWork>;
  onDelete: (id: number) => () => void;
}

export const useTableRows = ({ data, onDelete }: Props) => {
  const { t, i18n } = useTranslation();
  return data.map(
    ({
      id,
      title,
      date_start,
      date_end,
      nature,
      status,
      type,
      recipient_groups,
      responsible,
    }) => {
      const groupsArr = recipient_groups.map((el) => {
        return formatAddress(el);
      });
      return {
        id: <TableText>{String(id)}</TableText>,
        status: status ? (
          <Badge
            color={
              status.id === 1 ? 'green' : status.id === 2 ? 'white' : 'red'
            }
          >
            {status?.name}
          </Badge>
        ) : (
          <TableText>{'-'}</TableText>
        ),
        period: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TableText>{`${t('period.from').toLocaleLowerCase()} ${format(date_start * 1000, 'dd.MM.yyyy')}`}</TableText>
            <TableText>{`${t('period.to').toLocaleLowerCase()} ${format(date_end * 1000, 'dd.MM.yyyy')}`}</TableText>
            {!date_start && !date_end && <TableText>{'-'}</TableText>}
          </div>
        ),
        type: <TableText>{type?.name || '-'}</TableText>,
        nature: <TableText>{nature?.name || '-'}</TableText>,
        title: (
          <TableText fontWeight="medium">
            {title?.[i18n.language as 'en' | 'ru'] || '-'}
          </TableText>
        ),
        group: <TableText>{groupsArr.join('; ') || '-'}</TableText>,
        responsible: responsible ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TableText fontWeight="semibold">{responsible?.name}</TableText>
            <TableText>{responsible?.phone_number}</TableText>
          </div>
        ) : (
          <TableText fontWeight="semibold">{'-'}</TableText>
        ),
        controls: (
          <TableControls
            getUpdateRoute={
              AppRoutes[AppRoutesEnum.ADMIN_TECHNICAL_WORKS_UPDATE]
            }
            onDelete={onDelete(id)}
            rotateIcon={false}
            id={id}
          />
        ),
      };
    },
  );
};
