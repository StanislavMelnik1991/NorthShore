import { PageLayout } from "@widgets/layouts";
import { PageHeader } from "@entities/PageHeader";
import { Pagination } from "@entities/Pagination";
import { PerPage } from "@entities/PerPageSelect";
import { IconBriefcase, IconLoupe, IconPlus } from "@shared/icons";
import { Button, Card, TextField } from "@shared/ui";
import { Table } from "@shared/ui/Table";
import { useTableConfig } from "../constants";
import { useNewsList } from "../hooks";
import { useDataFormatHelper } from "../utils/dataFormatHelper";
import styles from "./Page.module.scss";

const Page = () => {
  const {
    location,
    data,
    handleCreateClick,
    search,
    setSearch,
    total,
    setPage,
    perPage,
    setPerPage,
    isLoading,
    t,
  } = useNewsList();
  const tableConfig = useTableConfig();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: t("routes.news") }]}
      />
      <Card padding={12} gap={20} loading={isLoading} loaderSize={32}>
        <Button onClick={handleCreateClick}>
          <IconPlus width={24} height={24} />
          {t("controls.create")}
        </Button>
        <Button variant="light">
          <IconBriefcase width={24} height={24} />
          {t("controls.archive")}
        </Button>
        <TextField
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          wrapperClassName={styles.input}
          placeholder={t("controls.find")}
          leftItem={<IconLoupe width={20} height={20} />}
        />
      </Card>
      <Card padding={0} flexDirection="column" loading={isLoading}>
        <Table config={tableConfig} items={useDataFormatHelper(data)} />
        <div className={styles.controls}>
          <PerPage active={perPage} setActive={setPerPage} />
          <Pagination total={total} onChange={setPage} />
        </div>
      </Card>
    </PageLayout>
  );
};

export default Page;