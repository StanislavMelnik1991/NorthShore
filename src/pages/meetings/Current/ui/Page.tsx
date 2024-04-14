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
import { useCurrentMeeting } from "../hook";

export default () => {
  const { isLoading, event, i18n, t, date } = useCurrentMeeting();
  return (
    <PageSkeleton>
      <PageHeader
        hideTitle
        breadcrumbs={[
          { href: "", title: t("routes.meetings") },
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
        created_at={event && new Date(event.created_at * 1000)}
        isLoading={isLoading}
        title={event?.title[i18n.language as LanguageEnum]}
        date={date}
        link={event?.meeting_link}
      />
    </PageSkeleton>
  );
};
