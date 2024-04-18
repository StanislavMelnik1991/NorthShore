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
import { useCurrentNews } from '../hook';

export default () => {
  const { isLoading, news, i18n, t } = useCurrentNews();
  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          { href: AppRoutes[AppRoutesEnum.NEWS](), title: t('routes.news') },
          { href: '', title: news?.title[i18n.language as LanguageEnum] || '' },
        ]}
      />
      <ContentWidget
        html={
          news &&
          sanitizeHtml(news.html_content[i18n.language as LanguageEnum], {
            allowedTags: allowedTagsSanitizer,
            allowedAttributes: allowedAttributesSchema,
            allowedIframeHostnames: allowedIframeHostnamesSchema,
          })
        }
        created_at={news && new Date(news.created_at * 1000)}
        isLoading={isLoading}
        title={news?.title[i18n.language as LanguageEnum]}
        date={news?.target_date ? new Date(news.target_date * 1000) : undefined}
        link={news?.meeting_link}
      />
    </PageSkeleton>
  );
};
