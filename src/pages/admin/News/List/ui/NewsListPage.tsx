import { PageHeader } from "@entities/PageHeader";
import { Pagination } from "@entities/Pagination";
import { PerPage } from "@entities/PerPageSelect";
import { IconBriefcase, IconLoupe, IconPlus } from "@shared/icons";
import { PageLayout } from "@shared/layouts";
import { Button, Card, TextField } from "@shared/ui";
import { Table } from "@shared/ui/Table";
import { tableConfig } from "../constants";
import { useNewsList } from "../hooks";
import { dataFormatHelper } from "../utils/dataFormatHelper";
import styles from "./NewsListPage.module.scss";

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
  } = useNewsList();
  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: "Новости" }]}
      />
      <Card padding={12} gap={20}>
        <Button onClick={handleCreateClick}>
          <IconPlus width={24} height={24} />
          Создать
        </Button>
        <Button variant="light">
          <IconBriefcase width={24} height={24} />
          Перейти в архив
        </Button>
        <TextField
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          wrapperClassName={styles.input}
          placeholder={"Поиск"}
          leftItem={<IconLoupe width={20} height={20} />}
        />
      </Card>
      <Card padding={0} flexDirection="column">
        <Table config={tableConfig} items={dataFormatHelper(data)} />
        <div className={styles.controls}>
          <PerPage active={perPage} setActive={setPerPage} />
          <Pagination total={total} onChange={setPage} />
        </div>
      </Card>
    </PageLayout>
  );
};

export default Page;
