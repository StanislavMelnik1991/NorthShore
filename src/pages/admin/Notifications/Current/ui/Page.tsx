import { formatAddress } from '@features/utils';
import {
  NotificationContent,
  PageHeader,
  PageSkeleton,
  Tab,
} from '@entities/components';
import {
  ACCEPTED_LANGUAGES,
  AppRoutes,
  AppRoutesEnum,
  LanguageEnum,
} from '@shared/constants';
import { Card, Text } from '@shared/ui';
import { useCurrentNotification } from '../hook';

export default () => {
  const { isLoading, data, i18n, t } = useCurrentNotification();

  const labels = ACCEPTED_LANGUAGES.map((lang) => {
    return (
      <Text variant="body16" fontWeight="medium" key={`tab-label-${lang}`}>
        {t(`editor.titles.${lang}`)}
      </Text>
    );
  });
  const tabs = ACCEPTED_LANGUAGES.map((lang) => {
    if (!data) {
      return <></>;
    }
    return (
      <NotificationContent
        createdAt={new Date(data.data_add * 1000)}
        groups={data.recipient_groups.map((el) => formatAddress(el))}
        title={data.title[lang]}
        content={data.body[lang]}
        image={data.image?.url}
        link={data.url}
        needPush={Boolean(data.need_push)}
        key={`NotificationContent-${lang}`}
      />
    );
  });
  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.ADMIN_NOTIFICATIONS](),
            title: t('routes.list'),
          },
          {
            title: data?.title[i18n.language as LanguageEnum] || '',
          },
        ]}
      />
      <Card loading={isLoading}>
        <Tab labels={labels} tabs={tabs} />
      </Card>
    </PageSkeleton>
  );
};
