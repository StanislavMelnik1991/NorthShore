import { SchemeWithMockData } from '@widgets/engineering';
import {
  Accident,
  CurrentSkeleton,
  PageHeader,
  PageSkeleton,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Card, Text, Title } from '@shared/ui';
import { useCurrentEnergy } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { t, accidents, outsideTemperature } = useCurrentEnergy();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ENGINEERING_HEATING](),
            title: t('routes.heating'),
          },
        ]}
      />
      <CurrentSkeleton className={styles.wrapper}>
        <Card hideShadow className={styles.thermometer}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Text variant="body14" fontWeight="regular">
                {t('outsideTemperature')}
              </Text>
              <Title variant="h3" fontWeight="semibold">
                {`${outsideTemperature}℃`}
              </Title>
            </div>
          </div>
        </Card>
        <SchemeWithMockData className={styles.schema} />
        <div className={styles.accidents}>
          {accidents.map((el, index) => {
            return <Accident title={el} key={`Accident-${el}-${index}`} />;
          })}
        </div>
      </CurrentSkeleton>
    </PageSkeleton>
  );
};
