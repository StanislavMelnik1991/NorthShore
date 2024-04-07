import classNames from "classnames";
import { PageHeader } from "@entities/PageHeader";
import { IconLoupe } from "@shared/icons";
import { Button, Card, TextField } from "@shared/ui";
import { Table } from "@shared/ui/Table";
import { tableConfig } from "../constants";
import { useNewsList } from "../hooks";
import { dataFormatHelper } from "../utils/dataFormatHelper";
import styles from "./NewsListPage.module.scss";

interface Props {
  className?: string;
}

const Page = ({ className }: Props) => {
  const { location, data, handleCreateClick, search, setSearch } =
    useNewsList();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: "Новости" }]}
      />
      <Card padding={12} gap={20}>
        <Button onClick={handleCreateClick}>Создать</Button>
        <Button variant="light">Перейти в архив </Button>
        <TextField
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          wrapperClassName={styles.input}
          placeholder={"Поиск"}
          leftItem={<IconLoupe width={20} height={20} />}
        />
      </Card>
      <Card padding={0}>
        <Table config={tableConfig} items={dataFormatHelper(data)} />
      </Card>
    </div>
  );
};

export default Page;
