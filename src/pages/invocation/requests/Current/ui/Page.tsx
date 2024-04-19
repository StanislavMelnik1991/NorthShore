import sanitizeHtml from 'sanitize-html';
import { RequestContentWidget } from '@widgets/invocation';
import { PageHeader, PageSkeleton } from '@entities/components';
import {
  AppRoutes,
  AppRoutesEnum,
  RequestThemesEnum,
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from '@shared/constants';
import { useCurrentEvent } from '../hook';

export default () => {
  const { isLoading, data, t } = useCurrentEvent();
  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          {
            href: AppRoutes[AppRoutesEnum.POSTER](),
            title: t('routes.requests'),
          },
          {
            href: '',
            title: `№ ${data?.id || ''}`,
          },
        ]}
      />
      <RequestContentWidget
        html={
          data &&
          sanitizeHtml(data.content, {
            allowedTags: allowedTagsSanitizer,
            allowedAttributes: allowedAttributesSchema,
            allowedIframeHostnames: allowedIframeHostnamesSchema,
          })
        }
        created_at={data && new Date(data.data_add * 1000)}
        isLoading={isLoading}
        title={data?.title}
        images={data?.files}
        idTitle={`${t('request')} №${data?.id}`}
        status={data?.status.id}
        contact={data?.contact_fio}
        theme={
          data ? t(`themes.${RequestThemesEnum[data?.theme.id]}`) : undefined
        }
        contactsTitle={t('editor.contact_fio.label')}
      />
    </PageSkeleton>
  );
};
