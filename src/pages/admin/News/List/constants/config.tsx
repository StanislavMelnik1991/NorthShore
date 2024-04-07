import { Text } from "@shared/ui";
import { ConfigItemType } from "@shared/ui/Table";

export const tableConfig: Array<ConfigItemType> = [
  {
    name: "id",
    label: (
      <Text fontWeight="regular" variant="body14">
        №
      </Text>
    ),
    width: 92,
  },
  {
    name: "status",
    label: (
      <Text fontWeight="regular" variant="body14">
        статус
      </Text>
    ),
    width: 121,
  },
  {
    name: "title",
    label: (
      <Text fontWeight="regular" variant="body14">
        заголовок
      </Text>
    ),
    width: 215,
  },
  {
    name: "text",
    label: (
      <Text fontWeight="regular" variant="body14">
        текст
      </Text>
    ),
  },
  {
    name: "date",
    label: (
      <Text fontWeight="regular" variant="body14">
        дата
      </Text>
    ),
    width: 107,
  },
];
