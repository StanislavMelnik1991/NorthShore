import sanitizeHtml from "sanitize-html";
import { PageHeader } from "@entities/PageHeader";
import {
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from "@shared/constants";
import { PageLayout } from "@shared/layouts";
import { Badge, Card, Loader, Title } from "@shared/ui";
import { useCurrentNews } from "../hook";

export default () => {
  const { isLoading, news } = useCurrentNews();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: "", title: "Новости" },
          { href: "", title: news?.title || "" },
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
                  {new Date(news.created_at).toLocaleDateString()}
                </Badge>
                <Title>{news.title}</Title>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(news.html_content, {
                      allowedTags: allowedTagsSanitizer,
                      allowedAttributes: allowedAttributesSchema,
                      allowedIframeHostnames: allowedIframeHostnamesSchema,
                    }),
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
