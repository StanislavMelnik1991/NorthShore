import classNames from "classnames";
import { useState } from "react";
import { PageLoader } from "@widgets/PageLoader";
import { ContentQuillEditor } from "@entities/QuillEditor/ContentQuillEditor";
import { Button, Text, Title } from "@shared/ui";
import styles from "./NotFound.module.scss";

interface Props {
  className?: string;
}

const NotFoundPage = ({ className }: Props) => {
  const [val, setVal] = useState("");
  return (
    <div className={classNames(styles.wrapper, className)}>
      <ContentQuillEditor
        uploadImage={async () => {
          return [{ url: "" }];
        }}
        showSpinner={() => {}}
        hideSpinner={() => {}}
        initialValue={val}
        setValue={setVal}
      />
      {val}
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
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
        Опубликовать
      </Button>
      <Button variant="danger" loading width={200}>
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
