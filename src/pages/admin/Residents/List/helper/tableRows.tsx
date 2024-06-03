import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { formatAddress } from '@features/utils';
import { TableControls, TableText } from '@entities/components';
import { IResident } from '@entities/types';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';

export const useTableRows = (
  data: Array<IResident>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setPopUpId: Dispatch<SetStateAction<string | undefined>>,
) => {
  const { t } = useTranslation('residents');
  return data.map(({ user_id, account, user, apartment }) => {
    return {
      id: <TableText>{String(user_id)}</TableText>,
      account: <TableText>{account}</TableText>,
      name: <TableText fontWeight="semibold">{user.name}</TableText>,
      phone_number: <TableText>{user.phone_number}</TableText>,
      objects: <TableText>{formatAddress({ apartment })}</TableText>,
      lang: (
        <TableText>
          {user.lang === 'en' ? t('langs.en') : t('langs.ru')}
        </TableText>
      ),
      controls: (
        <TableControls
          getDetailsRoute={AppRoutes[AppRoutesEnum.RESIDENTS_CURRENT]}
          notificationFunction={(id) => {
            setOpen(true);
            setPopUpId(id.toString());
          }}
          id={user_id}
        />
      ),
    };
  });
};
