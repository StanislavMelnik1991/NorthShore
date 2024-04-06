import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "@entities/PageHeader";
import { IconLoupe } from "@shared/icons";
import { Button, Card, TextField } from "@shared/ui";
import styles from "./NewsListPage.module.scss";

interface Props {
  className?: string;
}

const Page = ({ className }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <PageHeader
        breadcrumbs={[{ href: location.pathname, title: "Новости" }]}
      />
      <Card padding={12} gap={20}>
        <Button
          onClick={() => {
            navigate(`${location.pathname}/create`);
          }}
        >
          Создать
        </Button>
        <Button variant="light">Перейти в архив </Button>
        <TextField
          wrapperClassName={styles.input}
          placeholder={"Поиск"}
          leftItem={<IconLoupe width={20} height={20} />}
        />
      </Card>
    </div>
  );
};

export default Page;
