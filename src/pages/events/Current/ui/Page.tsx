import sanitizeHtml from 'sanitize-html';
import { ContentWidget } from '@widgets/Content';
import { PageHeader, PageSkeleton } from '@entities/components';
import {
  AppRoutes,
  AppRoutesEnum,
  LanguageEnum,
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from '@shared/constants';
import { useCurrentEvent } from '../hook';

export default () => {
  const { isLoading, event, i18n, t } = useCurrentEvent();
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
            title: event?.title[i18n.language as LanguageEnum] || '',
          },
        ]}
      />
      <ContentWidget
        html={
          event &&
          sanitizeHtml(event.html_content[i18n.language as LanguageEnum], {
            allowedTags: allowedTagsSanitizer,
            allowedAttributes: allowedAttributesSchema,
            allowedIframeHostnames: allowedIframeHostnamesSchema,
          })
        }
        created_at={event && new Date(event.created_at * 1000)}
        isLoading={isLoading}
        title={event?.title[i18n.language as LanguageEnum]}
        date={
          event?.target_date ? new Date(event.target_date * 1000) : undefined
        }
        link={event?.meeting_link}
      />
    </PageSkeleton>
  );
};
