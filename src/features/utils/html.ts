import sanitizeHtml from 'sanitize-html';
import { textTags } from '@shared/constants';

export const extractTextFromHtml = (htmlText: string) => {
  const sanitizedText = sanitizeHtml(htmlText, {
    allowedTags: textTags,
  });

  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(sanitizedText, 'text/html');
  let textContent = '';
  parsedHtml.body.childNodes.forEach((node) => {
    textContent += node.textContent + ' ';
  });
  return textContent.replace(/\s\s+/g, ' ');
};
