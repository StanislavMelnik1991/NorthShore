import sanitizeHtml from "sanitize-html";
import { PageLayout } from "@widgets/layouts";
import { PageHeader } from "@entities/PageHeader";
import {
  LanguageEnum,
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from "@shared/constants";
import { Badge, Card, Title } from "@shared/ui";
import { useCurrentNews } from "../hook";
import styles from "./Page.module.scss";

export default () => {
  const { isLoading, news, i18n, t } = useCurrentNews();
  return (
    <PageLayout>
      <PageHeader
        hideTitle
        breadcrumbs={[
          { href: "", title: t("routes.news") },
          { href: "", title: news?.title[i18n.language as LanguageEnum] || "" },
        ]}
      />
      <Card className={styles.card} loading={isLoading} flexDirection="column">
        {news && (
          <>
            <Badge color="dark">
              {new Date(news.created_at * 1000).toLocaleDateString()}
            </Badge>
            <Title fontWeight="semibold" variant="h2">
              {news.title[i18n.language as LanguageEnum]}
            </Title>
            <div
              className={styles.htmlContent}
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
      </Card>
    </PageLayout>
  );
};
