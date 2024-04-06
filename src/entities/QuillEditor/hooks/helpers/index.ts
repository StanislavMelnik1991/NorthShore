/* eslint-disable @typescript-eslint/no-explicit-any */
import get from "lodash/get";
import { linkStrategyService } from "./linkStrategy";

//TODO: split up into separate files
export const isEmptyLineByIndex = (editor: any, index: number): boolean => {
  const [block] = editor.getLine(index);
  const line = get(block, "domNode.outerHTML", "");
  return (
    !line.replace(/<(.|\n)*?>/g, "").length &&
    !line.includes("<img") &&
    !line.includes("<iframe")
  );
};

export const removeLinkPlaceholderToLine = (editor: any, index: number) => {
  const [block] = editor.getLine(index);
  if (block) {
    block.domNode.removeAttribute("data-placeholder");
  }
};

export const insertLink = (editor: any, link: string, position: number) => {
  const linkData = linkStrategyService.parseLink(link);
  const insertLinkStrategy = linkStrategyService.getStrategy(
    linkData.sourceType,
  );

  insertLinkStrategy(editor, linkData, position);
};

export const insertImage = (editor: any, url: string): void => {
  const cursorPosition = editor.getSelection()?.index ?? 1;
  editor.insertText(cursorPosition, "\n");
  editor.insertEmbed(cursorPosition, "image", url);
};

export const deletePasteImage = (editor: any) => {
  let cursorPosition = editor.getSelection()?.index ?? 0;

  if (cursorPosition !== 0) {
    editor.insertText(cursorPosition, "\n");
    cursorPosition = cursorPosition + 1;
  }

  setTimeout(() => {
    editor.deleteText(cursorPosition, 1);
  }, 300);
};
