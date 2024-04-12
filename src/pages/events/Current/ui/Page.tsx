import { format } from "date-fns";
import sanitizeHtml from "sanitize-html";
import { PageLayout } from "@widgets/layouts";
import { PageHeader } from "@entities/PageHeader";
import {
  LanguageEnum,
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from "@shared/constants";
import { IconCalendar, IconClock } from "@shared/icons";
import { Badge, Card, Text, Title } from "@shared/ui";
import { useCurrentEvent } from "../hook";
import styles from "./Page.module.scss";

export default () => {
  const { isLoading, event, i18n, t, date } = useCurrentEvent();
  return (
    <PageLayout>
      <PageHeader
        hideTitle
        breadcrumbs={[
          { href: "", title: t("routes.events") },
          {
            href: "",
            title: event?.title[i18n.language as LanguageEnum] || "",
          },
        ]}
      />
      <Card className={styles.card} loading={isLoading} flexDirection="column">
        {event && (
          <>
            <Badge color="dark">
              {new Date(event.created_at * 1000).toLocaleDateString()}
            </Badge>
            <Title fontWeight="semibold" variant="h2">
              {event.title[i18n.language as LanguageEnum]}
            </Title>
            {date && (
              <div className={styles.date}>
                <div className={styles.dateCard}>
                  <Text
                    className={styles.label}
                    variant="body14"
                    fontWeight="regular"
                  >
                    {t("content.date")}
                  </Text>
                  <Text variant="body14" fontWeight="semibold">
                    <IconCalendar
                      className={styles.icon}
                      width={20}
                      height={20}
                    />
                    {format(date, "dd.MM.yyyy")}
                  </Text>
                </div>
                <div className={styles.dateCard}>
                  <Text
                    className={styles.label}
                    variant="body14"
                    fontWeight="regular"
                  >
                    {t("content.time")}
                  </Text>
                  <Text variant="body14" fontWeight="semibold">
                    <IconClock className={styles.icon} width={20} height={20} />
                    {format(date, "HH:mm")}
                  </Text>
                </div>
              </div>
            )}
            <div
              className={styles.htmlContent}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  event.html_content[i18n.language as LanguageEnum],
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
