import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { PageHeader } from "@entities/PageHeader";
import { getRouteAdminNews } from "@shared/constants";
import { Button, Card, TextField } from "@shared/ui";
import styles from "./CreateNewsPage.module.scss";

interface Props {
  className?: string;
}

const Page = ({ className }: Props) => {
  const location = useLocation();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <PageHeader
        breadcrumbs={[
          { href: getRouteAdminNews(), title: "Новости" },
          { href: location.pathname, title: "Создание новости" },
        ]}
      />
      <Card flexDirection="column" gap={24}>
        <TextField
          wrapperClassName={styles.textField}
          label="Заголовок"
          placeholder="Заголовок новости"
        />
        <Button variant={"light"} className={styles.downloadButton}>
          Изображение обложки
        </Button>
      </Card>
    </div>
  );
};

export default Page;
