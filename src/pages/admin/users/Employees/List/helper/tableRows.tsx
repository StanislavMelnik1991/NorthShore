import { useTranslation } from 'react-i18next';
import { TableControls, TableText } from '@entities/components';
import { IEmployee } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import styles from './tableRows.module.scss';

export const useTableRows = (
  data: Array<IEmployee>,
  onDelete: (id: number) => () => Promise<void> | void,
) => {
  const { t } = useTranslation('employees');
  return data.map(
    ({ id, name, phone_number, department, job_title, work_phone, id_1c }) => {
      return {
        id: <TableText>{String(id)}</TableText>,
        id_1c: <TableText>{id_1c || '-'}</TableText>,
        name: <TableText fontWeight="semibold">{name}</TableText>,
        phone_number: (
          <TableText className={styles.wrap}>
            {phone_number}
            {phone_number && !!work_phone ? ';\n' : '\n'}
            {work_phone ? work_phone : ''}
          </TableText>
        ),
        department: (
          <TableText>
            {department ? department.name : t('fields.other')}
          </TableText>
        ),
        role: <TableText>{job_title}</TableText>,
        controls: (
          <TableControls
            getDetailsRoute={AppRoutes[AppRoutesEnum.EMPLOYEES_CURRENT]}
            getUpdateRoute={AppRoutes[AppRoutesEnum.EMPLOYEES_UPDATE]}
            onDelete={onDelete(id)}
            id={id}
          />
        ),
      };
    },
  );
};
