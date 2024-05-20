import { Link } from 'react-router-dom';
import {
  CurrentSkeleton,
  PageHeader,
  PageSkeleton,
} from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { IconPhone, IconPoint } from '@shared/icons';
import { Button, Text, Title } from '@shared/ui';
import { useCurrent } from '../hook';
import styles from './Page.module.scss';

export default () => {
  const { isLoading, data, t, language } = useCurrent();

  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.SERVICES](),
            title: t('routes.list'),
          },
          { title: data?.title[language] || ' ' },
        ]}
      />
      <div className={styles.wrapper}>
        <CurrentSkeleton className={styles.content} isLoading={isLoading}>
          <Title variant="h2" fontWeight="semibold">
            {data?.title[language] || ''}
          </Title>
          {data?.image && <img src={data.image.url} className={styles.image} />}
          <Text>{data?.body[language]}</Text>
        </CurrentSkeleton>

        {data && (
          <CurrentSkeleton
            className={styles.card}
            flexDirection="column"
            gap={24}
            isLoading={isLoading}
          >
            <div className={styles.row}>
              <IconPoint width={20} height={20} />
              <div className={styles.contact}>
                <Text variant="body16" fontWeight="medium">
                  {t('address')}
                </Text>
                <Text
                  className={styles.dark}
                  variant="body14"
                  fontWeight="regular"
                >
                  {data?.company_address}
                </Text>
              </div>
            </div>
            <div className={styles.row}>
              <IconPhone
                theme="light"
                className={styles.icon}
                width={20}
                height={20}
              />
              <div className={styles.contact}>
                <Text variant="body16" fontWeight="medium">
                  {t('phone')}
                </Text>
                <div className={styles.list}>
                  {data?.phone_numbers.map((el, index) => {
                    return (
                      <Text
                        className={styles.dark}
                        variant="body14"
                        fontWeight="regular"
                        key={`company_phone_${index}`}
                      >
                        {el}
                      </Text>
                    );
                  })}
                </div>
              </div>
            </div>
            <Link to={data?.url} target="_blank">
              <Button className={styles.button} variant="light">
                {t('controls.goSite')}
              </Button>
            </Link>
          </CurrentSkeleton>
        )}
      </div>
    </PageSkeleton>
  );
};
