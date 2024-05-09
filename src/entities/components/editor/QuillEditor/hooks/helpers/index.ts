import ReactQuill from 'react-quill';
import { linkStrategyService } from './linkStrategy';

type Editor = Required<ReactQuill['editor']>;

export const insertLink = (
  editor: NonNullable<Editor>,
  link: string,
  position: number,
) => {
  const linkData = linkStrategyService.parseLink(link);
  const insertLinkStrategy = linkStrategyService.getStrategy(
    linkData.sourceType,
  );

  insertLinkStrategy(editor, linkData, position);
};

export const insertImage = (editor: NonNullable<Editor>, url: string): void => {
  if (!editor) {
    return;
  }
  const cursorPosition = editor.getSelection()?.index ?? 1;
  editor.insertText(cursorPosition, '\n');
  editor.insertEmbed(cursorPosition, 'image', url);
  editor.insertText(cursorPosition, '\n');
};
