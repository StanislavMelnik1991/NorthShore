import { PersonalNotification } from '@widgets/Content/personalNotification';
import {
  NotificationHistory,
  ResidentAccess,
  ResidentMainInfo,
  ResidentRequests,
} from '@widgets/resident';
import {
  AccessModal,
  CamerasModal,
  IntercomModal,
  SlsModal,
} from '@widgets/Security';
import { PageHeader, PageSkeleton, Tab } from '@entities/components';
import { AppRoutes, AppRoutesEnum, LanguageEnum } from '@shared/constants';
import { IconMail } from '@shared/icons';
import { Button, Card, Text } from '@shared/ui';
import { useResidentsList } from '../hooks';
import styles from './Page.module.scss';

const Page = () => {
  const {
    t,
    id,
    data,
    open,
    setOpen,
    isLoading,
    accessPoint,
    setAccessPoint,
    intercom,
    setIntercom,
    camera,
    setCamera,
    setSlsIntercom,
    slsIntercom,
    securityRights,
    accessData,
    isAccessLoading,
    isRequestsLoading,
    requests,
    requestsTotal,
    handleUpdate,
    isNotificationsLoading,
    notificationsData,
    notificationsTotal,
  } = useResidentsList();
  const labels = [
    <Text variant="body16" fontWeight="medium" key={1}>
      {t('tabs.general_info')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={2}>
      {t('tabs.requests')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={3}>
      {t('tabs.access_points')}
    </Text>,
    <Text variant="body16" fontWeight="medium" key={4}>
      {t('tabs.notifications_history')}
    </Text>,
  ];

  const tabs = [
    <ResidentMainInfo data={data} key={'tab1'} />,
    <ResidentRequests
      total={requestsTotal}
      initialData={requests}
      id={id}
      key={'tab2'}
    />,
    <ResidentAccess
      handleUpdate={handleUpdate}
      id={id}
      selectIntercom={securityRights.intercom && setIntercom}
      selectPoint={securityRights.accessPoint && setAccessPoint}
      selectCamera={securityRights.video && setCamera}
      selectSls={securityRights.sls && setSlsIntercom}
      data={accessData}
      key={'tab3'}
    />,
    <NotificationHistory
      total={notificationsTotal}
      initialData={notificationsData}
      id={id}
      key={'tab4'}
      lang={data?.lang || LanguageEnum.RU}
    />,
  ];

  const disabledTabs = [
    isLoading,
    isRequestsLoading || !requests.length,
    isAccessLoading,
    isNotificationsLoading || !notificationsData.length,
  ];

  return (
    <PageSkeleton>
      <PageHeader
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.RESIDENTS](),
            title: t('routes.residents'),
          },
          { href: '', title: t('routes.resident') + ' № ' + id },
        ]}
        lastTitle={data?.name}
        controls={
          <Button variant="primary" size="large" onClick={() => setOpen(true)}>
            <IconMail width={20} height={20} />
            {t('controls.personal_notification')}
          </Button>
        }
      />
      <PersonalNotification id={id} open={open} setOpen={setOpen} />
      <AccessModal
        accessPoint={accessPoint}
        onClose={() => setAccessPoint(undefined)}
      />
      <IntercomModal data={intercom} onClose={() => setIntercom(undefined)} />
      <CamerasModal data={camera} onClose={() => setCamera(undefined)} />
      <SlsModal data={slsIntercom} onClose={() => setSlsIntercom(undefined)} />
      <Card className={styles.card} loading={isLoading}>
        <Tab labels={labels} tabs={tabs} disabled={disabledTabs} />
      </Card>
    </PageSkeleton>
  );
};

export default Page;
