import { format } from "date-fns";
import sanitizeHtml from "sanitize-html";
import { ContentWidget } from "@widgets/Content";
import { PageHeader } from "@entities/PageHeader";
import { PageSkeleton } from "@entities/skeletons";
import {
  LanguageEnum,
  allowedAttributesSchema,
  allowedIframeHostnamesSchema,
  allowedTagsSanitizer,
} from "@shared/constants";
import { useCurrentEvent } from "../hook";

export default () => {
  const { isLoading, event, i18n, t, date } = useCurrentEvent();
  return (
    <PageSkeleton>
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
      <ContentWidget
        html={
          event &&
          sanitizeHtml(event.html_content[i18n.language as LanguageEnum], {
            allowedTags: allowedTagsSanitizer,
            allowedAttributes: allowedAttributesSchema,
            allowedIframeHostnames: allowedIframeHostnamesSchema,
          })
        }
        created_at={event && format(event.created_at * 1000, "dd.MM.yyyy")}
        isLoading={isLoading}
        title={event?.title[i18n.language as LanguageEnum]}
        date={date}
      />
    </PageSkeleton>
  );
};
