import classNames from "classnames";
import { Card, Text } from "@shared/ui";
import styles from "./NewsCard.module.scss";

interface Props {
  className?: string;
  image?: string;
  title: string;
  text: string;
  link?: string;
}

export const NewsCard = ({ className, image, text, title, link }: Props) => {
  return (
    <a href={link}>
      <Card
        padding={0}
        flexDirection="column"
        gap={0}
        className={classNames(className)}
      >
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image} alt={title} />
        </div>
        <div className={styles.text}>
          <Text className={styles.title} fontWeight="semibold" variant="body16">
            {title}
          </Text>
          <Text
            className={styles.textContent}
            fontWeight="regular"
            variant="body14"
          >
            {text}
          </Text>
        </div>
      </Card>
    </a>
  );
};
