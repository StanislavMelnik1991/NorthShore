import { RequestComment, RequestContentWidget } from '@widgets/invocation';
import { PageHeader, PageSkeleton } from '@entities/components';
import { AppRoutes, AppRoutesEnum, RequestThemesEnum } from '@shared/constants';
import { useCurrentEvent } from '../hook';

export default () => {
  const { isLoading, data, t, id } = useCurrentEvent();
  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.REQUESTS](),
            title: t('routes.requests'),
          },
          {
            title: `№ ${id}`,
          },
        ]}
      />
      <RequestContentWidget
        text={data?.content}
        created_at={data && new Date(data.data_add * 1000)}
        isLoading={isLoading}
        title={data?.title}
        images={data?.files}
        idTitle={`${t('request')} №${id}`}
        status={data?.status.id}
        contact={data?.contact_fio}
        theme={
          data ? t(`themes.${RequestThemesEnum[data?.theme.id]}`) : undefined
        }
        contactsTitle={t('editor.contact_fio.label')}
      />
      {data && (
        <RequestComment
          date={new Date(data.data_add * 1000)}
          text={data.comment}
        />
      )}
    </PageSkeleton>
  );
};
