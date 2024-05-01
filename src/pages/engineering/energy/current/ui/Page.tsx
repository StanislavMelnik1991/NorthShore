import { EngineeringChart } from '@widgets/engineering';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useCurrentEnergy } from '../hook';

export default () => {
  const { isLoading, t, from, setFrom, setTo, to, title, data } =
    useCurrentEnergy();

  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ENGINEERING_ENERGY](),
            title: t('routes.energy'),
          },
          {
            title,
          },
        ]}
      />
      <EngineeringChart
        data={data}
        from={from as Date}
        to={to as Date}
        setFrom={setFrom}
        setTo={setTo}
        isLoading={isLoading}
      />
    </PageSkeleton>
  );
};
