import sanitizeHtml from "sanitize-html";
import { PageLayout } from "@widgets/layouts";
import { PageHeader } from "@entities/PageHeader";
import {
  LanguageEnum,
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from "@shared/constants";
import { Badge, Card, Loader, Title } from "@shared/ui";
import { useCurrentNews } from "../hook";

export default () => {
  const { isLoading, news, i18n, t } = useCurrentNews();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: "", title: t("routes.news") },
          { href: "", title: news?.title[i18n.language as LanguageEnum] || "" },
        ]}
      />
      <Card padding={40} gap={10} flexDirection="column">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {news && (
              <>
                <Badge color="dark">
                  {new Date(news.created_at * 1000).toLocaleDateString()}
                </Badge>
                <Title>{news.title[i18n.language as LanguageEnum]}</Title>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(
                      news.html_content[i18n.language as LanguageEnum],
                      {
                        allowedTags: allowedTagsSanitizer,
                        allowedAttributes: allowedAttributesSchema,
                        allowedIframeHostnames: allowedIframeHostnamesSchema,
                      },
                    ),
                  }}
                />
              </>
            )}
          </>
        )}
      </Card>
    </PageLayout>
  );
};
