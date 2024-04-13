import { PageLayout } from "@widgets/layouts";
import { MeetingEditor } from "@widgets/Meetings";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminMeeting } from "@shared/constants";
import { Button } from "@shared/ui";
import { useCreateMeetingPage } from "../hook";
import styles from "./Page.module.scss";

const Page = () => {
  const {
    handleUploadImage,
    setIsDraft,
    errors,
    handleSubmit,
    setFieldValue,
    values,
    isValid,
    t,
  } = useCreateMeetingPage();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminMeeting(), title: t("routes.meetings") },
          { href: "", title: t("routes.create") },
        ]}
      />
      <form onSubmit={handleSubmit}>
        <MeetingEditor
          handleUploadImage={handleUploadImage}
          errors={errors}
          setFieldValue={setFieldValue}
          values={values}
          controls={
            <div className={styles.submitBlock}>
              <Button
                className={styles.submitButton}
                size="large"
                variant="primary"
                type="submit"
                disabled={!isValid}
                onClick={() => setIsDraft(1)}
              >
                {t("controls.publish")}
              </Button>
              <Button
                className={styles.submitButton}
                size="large"
                variant="secondary"
                type="submit"
                disabled={!isValid}
                onClick={() => setIsDraft(0)}
              >
                {t("controls.draft")}
              </Button>
            </div>
          }
        />
      </form>
    </PageLayout>
  );
};

export default Page;
