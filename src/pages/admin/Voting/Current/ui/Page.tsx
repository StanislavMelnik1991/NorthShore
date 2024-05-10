import { Link } from 'react-router-dom';
import { VotingContent } from '@widgets/Content';
import {
  CurrentSkeleton,
  LanguageTab,
  PageHeader,
  PageSkeleton,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum, LanguageEnum } from '@shared/constants';
import { IconPencil } from '@shared/icons';
import { Button } from '@shared/ui';
import { usePage } from '../hook';

export default () => {
  const { isLoading, data, t, id } = usePage();
  const tabs = {
    en: <VotingContent language={LanguageEnum.EN} data={data} />,
    ru: <VotingContent language={LanguageEnum.RU} data={data} />,
  };
  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_VOTING](),
            title: t('routes.list'),
          },
          { title: `${t('routes.voting')} №${id}` },
        ]}
      />
      <CurrentSkeleton isLoading={isLoading}>
        <LanguageTab
          tabs={tabs}
          action={
            data &&
            data.status.id === 1 && (
              <Link to={AppRoutes[AppRoutesEnum.ADMIN_VOTING_UPDATE](id)}>
                <Button variant="text">
                  <IconPencil width={20} height={20} />
                  {t('controls.edit')}
                </Button>
              </Link>
            )
          }
        />
      </CurrentSkeleton>
    </PageSkeleton>
  );
};
