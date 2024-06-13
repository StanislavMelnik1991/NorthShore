import {
  EngineeringChart,
  EngineeringInfo,
  MonthDetailsTable,
  PeriodDetailsTable,
} from '@widgets/engineering';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { useCurrentEnergy } from '../hook';

export default () => {
  const {
    isLoading,
    t,
    from,
    setFrom,
    setTo,
    to,
    title,
    location,
    measures,
    results,
    charge_status,
    operating_mode,
    voltage,
    id,
    month,
    total,
    isShowMonth,
    delta,
  } = useCurrentEnergy();

  return (
    <PageSkeleton>
      <PageHeader
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
      <EngineeringInfo
        charge_status={charge_status}
        isLoading={isLoading}
        operating_mode={operating_mode}
        voltage={voltage}
        location={location}
      />
      <EngineeringChart
        total={total}
        measures={measures}
        results={delta}
        from={from as Date}
        to={to as Date}
        setFrom={setFrom}
        setTo={setTo}
        isLoading={isLoading}
      />
      {month?.map(({ date, total }, index) => {
        return (
          <MonthDetailsTable
            total={total}
            date={date}
            id={id}
            measures={measures}
            key={`MonthDetailsTable-${index}`}
          />
        );
      })}
      {!!total && !isShowMonth && (
        <PeriodDetailsTable
          from={from}
          to={to}
          results={results}
          isLoading={isLoading}
          measures={measures}
          total={total}
        />
      )}
    </PageSkeleton>
  );
};
