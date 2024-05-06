import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconHuman } from '@shared/icons';
import { Button } from '@shared/ui';

interface Props {
  className?: string;
  isLogin?: boolean;
  logout: () => void;
}

export const AuthButton = ({ className, isLogin, logout }: Props) => {
  const { t } = useTranslation();
  if (isLogin) {
    return (
      <Button
        size="small"
        variant="danger"
        className={className}
        onClick={logout}
      >
        <IconHuman width={20} />
        {t('header.logout')}
      </Button>
    );
  }
  return (
    <Link to={AppRoutes[AppRoutesEnum.LOGIN]()}>
      <Button size="small" variant="primary" className={className}>
        <IconHuman width={20} />
        {t('header.login')}
      </Button>
    </Link>
  );
};
