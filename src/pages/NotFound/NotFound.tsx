import { useState } from "react";
import { PageLoader } from "@widgets/PageLoader";
import { QuillEditor } from "@entities/QuillEditor/QuillEditor";
import { PageLayout } from "@shared/layouts";
import { Button, Text, Title } from "@shared/ui";

const NotFoundPage = () => {
  const [val, setVal] = useState("");
  return (
    <PageLayout>
      <QuillEditor
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
    </PageLayout>
  );
};

export default NotFoundPage;
