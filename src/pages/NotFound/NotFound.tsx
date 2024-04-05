import classNames from "classnames";
import { PageLoader } from "@widgets/PageLoader";
import { Button, Text, Title } from "@shared/ui";
import styles from "./NotFound.module.scss";

interface Props {
  className?: string;
}

const NotFoundPage = ({ className }: Props) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title fontWeight="semibold" variant="h1">
        Not found
      </Title>
      <Text fontWeight="medium" variant="body16">
        text
      </Text>
      <Button loading width={200}>
        Опубликовать
      </Button>
      <Button variant="secondary" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <PageLoader />
    </div>
  );
};

export default NotFoundPage;
