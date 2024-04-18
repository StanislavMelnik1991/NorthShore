import sanitizeHtml from 'sanitize-html';
import { ContentWidget } from '@widgets/Content';
import { PageHeader, PageSkeleton } from '@entities/components';
import {
  AppRoutes,
  AppRoutesEnum,
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
            title: t('routes.events'),
          },
          {
            href: '',
            title: `№ ${data?.id || ''}`,
          },
        ]}
      />
      <ContentWidget
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
      />
    </PageSkeleton>
  );
};
