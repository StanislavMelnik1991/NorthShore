import { HeatingSchemaWidget } from '@widgets/engineering';
import {
  Accident,
  CurrentSkeleton,
  PageHeader,
  PageSkeleton,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconThermometer } from '@shared/icons';
import { Card, Text, Title } from '@shared/ui';
import { useCurrentEnergy } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { t, data } = useCurrentEnergy();

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ENGINEERING_HEATING](),
            title: t('routes.heating'),
          },
          {
            title: `${t('routes.heatingSingle')} № ${data?.id || 0}`,
          },
        ]}
      />
      <CurrentSkeleton className={styles.wrapper}>
        <Card hideShadow className={styles.thermometer}>
          {data?.parameters.air_temp && (
            <div className={styles.row}>
              <IconThermometer height={72} />

              <div className={styles.column}>
                <Text variant="body14" fontWeight="regular">
                  {t('outsideTemperature')}
                </Text>
                <Title variant="h3" fontWeight="semibold">
                  {`${data.parameters.air_temp}℃`}
                </Title>
              </div>
            </div>
          )}
        </Card>
        <HeatingSchemaWidget
          parameters={data?.parameters}
          className={styles.schema}
        />
        <div className={styles.accidents}>
          {data?.alarms.map((el, index) => {
            return <Accident title={el} key={`Accident-${el}-${index}`} />;
          })}
        </div>
      </CurrentSkeleton>
    </PageSkeleton>
  );
};
