import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum } from '@shared/constants';
import { Button, Card } from '@shared/ui';
import { useSecurityAccessPage } from '../hook';
import styles from './Page.module.scss';

const MainPage = () => {
  const { t, data, open } = useSecurityAccessPage();
  return (
    <PageSkeleton>
      <PageHeader
        className={styles.header}
        breadcrumbs={[
          {
            title: t('title'),
            href: AppRoutes[AppRoutesEnum.SECURITY](),
          },
          {
            title: t('modules.access'),

            href: AppRoutes[AppRoutesEnum.SECURITY_ACCESS](),
          },
        ]}
      />

      <div className={styles.list}>
        {data.map((el) => {
          return (
            <Card
              gap={12}
              key={`SecurityAccess-${el.id}`}
              flexDirection="column"
            >
              {el.name}
              <Button
                onClick={() => {
                  open(el.id, el.name);
                }}
              >
                {t('actions.open')}
              </Button>
            </Card>
          );
        })}
      </div>
    </PageSkeleton>
  );
};

export default MainPage;
