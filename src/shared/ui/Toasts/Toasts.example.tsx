import { toast } from "react-toastify";
import { PageLayout } from "../../layouts";
import { Button } from "../Button";
import { Card } from "../Card";

type Props = {
  message?: string;
  autoclose?: boolean;
};

export const ToastsExample = ({
  message = "some text",
  autoclose = true,
}: Props) => {
  return (
    <PageLayout>
      <Card flexDirection="column" gap={10}>
        <Button
          width={200}
          onClick={() =>
            toast(message, { autoClose: autoclose ? 5000 : false })
          }
        >
          main toast
        </Button>
        <Button
          width={200}
          onClick={() =>
            toast.error(message, { autoClose: autoclose ? 5000 : false })
          }
        >
          error toast
        </Button>
        <Button
          width={200}
          onClick={() =>
            toast.success(message, { autoClose: autoclose ? 5000 : false })
          }
        >
          success success
        </Button>
        <Button
          width={200}
          onClick={() =>
            toast.info(message, { autoClose: autoclose ? 5000 : false })
          }
        >
          info toast
        </Button>
        <Button
          width={200}
          onClick={() =>
            toast.loading(message, {
              autoClose: autoclose ? 5000 : false,
            })
          }
        >
          loading toast
        </Button>
        <Button width={200} onClick={() => toast.dismiss()}>
          close toast
        </Button>
        <Button
          width={200}
          onClick={() =>
            toast.dark(message, { autoClose: autoclose ? 5000 : false })
          }
        >
          dark toast
        </Button>
      </Card>
    </PageLayout>
  );
};
