import { TableControls } from "@widgets/Table";
import { extractTextFromHtml } from "@features/utils/sanitazeHtml";
import { TableText } from "@entities/Table";
import { TableBadge } from "@entities/Table/Badge/Badge";
import { INews } from "@entities/types";

export const dataFormatHelper = (data: Array<INews>) => {
  return data.map(({ id, is_draft, title, html_content, published_at }) => {
    return {
      id: <TableText text={String(id)} />,
      status: <TableBadge is_draft={!!is_draft} />,
      title: <TableText text={title} fontWeight="medium" />,
      date: <TableText text={new Date(published_at).toLocaleString()} />,
      text: <TableText text={extractTextFromHtml(html_content)} />,
      controls: <TableControls id={id} />,
    };
  });
};
