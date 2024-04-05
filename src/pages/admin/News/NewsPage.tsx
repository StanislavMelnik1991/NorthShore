import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextField, Title } from "@shared/ui";
import styles from "./NewsPage.module.scss";

interface Props {
  className?: string;
}

const NewsPage = ({ className }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title fontWeight="bold" variant="h1">
        Новости
      </Title>
      <div className={styles.header}>
        <Button
          onClick={() => {
            navigate(`${location.pathname}/create`);
          }}
        >
          Создать
        </Button>
        <Button variant="secondary">Перейти в архив </Button>
        <TextField wrapperClassName={styles.input} placeholder="Поиск" />
      </div>
    </div>
  );
};

export default NewsPage;
