import classNames from "classnames";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("table");
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
          {t("popup.preview")}
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
          {t("popup.edit")}
        </Text>
      </div>
      <div className={styles.item}>
        <IconEyeOpen width={20} hanging={20} />
        <Text fontWeight="regular" variant="body14">
          {t("popup.archive")}
        </Text>
      </div>
    </Card>
  );
};
