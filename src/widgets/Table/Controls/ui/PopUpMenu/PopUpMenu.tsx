import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { getCurrentNews, getRouteUpdateNews } from "@shared/constants";
import { IconEyeOpen } from "@shared/icons";
import { Card, Text } from "@shared/ui";
import styles from "./PopUpMenu.module.scss";

interface Props {
  className?: string;
  id: number;
}

export const PopUpMenu = ({ className, id }: Props) => {
  const naigate = useNavigate();
  return (
    <Card
      padding={6}
      flexDirection="column"
      className={classNames(styles.wrapper, className)}
    >
      <div
        className={styles.item}
        onClick={() => {
          naigate(getCurrentNews(id));
        }}
      >
        <IconEyeOpen width={20} hanging={20} />
        <Text fontWeight="regular" variant="body14">
          Просмотр
        </Text>
      </div>
      <div
        className={styles.item}
        onClick={() => {
          naigate(getRouteUpdateNews(id));
        }}
      >
        <IconEyeOpen width={20} hanging={20} />
        <Text fontWeight="regular" variant="body14">
          Редактировать
        </Text>
      </div>
      <div className={styles.item}>
        <IconEyeOpen width={20} hanging={20} />
        <Text fontWeight="regular" variant="body14">
          В архив
        </Text>
      </div>
    </Card>
  );
};
