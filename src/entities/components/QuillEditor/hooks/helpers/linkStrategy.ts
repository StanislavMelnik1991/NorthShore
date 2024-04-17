import ReactQuill from 'react-quill';
import {
  imageLinkParser,
  tiktokLinkParser,
  youtubeLinkParser,
} from './linkParsers';
import { insertImage } from '.';

export enum LinkType {
  DEFAULT = 'default',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
  IMAGE = 'image',
  IS_NOT_LINK = 'isNotLink',
}

type Editor = Required<ReactQuill['editor']>;

export type LinkData = {
  sourceType: LinkType;
  link: string;
};
type LinkStrategy = (
  editor: NonNullable<Editor>,
  linkData: LinkData,
  position: number,
) => void;

class LinkStrategyService {
  private defaultStategy: LinkStrategy = (editor, { link }, position) => {
    // editor.insertText(position, '\n', 'api')
    editor.clipboard.dangerouslyPasteHTML(
      position,
      `<a href="${link}" target="_blank" ref="noopener noreferrer">${link}</a>`,
      'api',
    );
  };

  private embedVideoStrategy: LinkStrategy = (editor, linkData, position) => {
    // editor.insertText(position, '\n')
    editor.insertEmbed(position, 'embedVideo', linkData, 'api');
  };

  // private embedVideoStrategy: LinkStrategy = (editor, linkData, position) => {
  //   editor.insertText(position, '\nasdasdasd')
  //   editor.clipboard.dangerouslyPasteHTML(
  //     position,
  //     `<figure class="video-container"><div class="video-wrapper"><iframe src="${linkData.link}" class="ql-video content-video ${linkData.sourceType}" allowfullscreen="true" frameborder="0"></iframe></div></figure>`
  //   )
  // }

  private isNotLinkStrategy: LinkStrategy = (editor, { link }, position) => {
    editor.insertText(position, link, 'api');
  };
  private imageLinkStrategy: LinkStrategy = (editor, { link }) => {
    insertImage(editor, link);
  };

  private isValidHttpLink = (string: string) => {
    let url: URL;
    try {
      url = new URL(string);
    } catch (_) {
      return null;
    }
    return url.href;
  };
  public getStrategy = (type: LinkType): LinkStrategy => {
    switch (type) {
      case LinkType.DEFAULT:
        return this.defaultStategy;
      case LinkType.TIKTOK:
      case LinkType.YOUTUBE:
        return this.embedVideoStrategy;
      case LinkType.IS_NOT_LINK:
        return this.isNotLinkStrategy;
      case LinkType.IMAGE:
        return this.imageLinkStrategy;
      default:
        return this.isNotLinkStrategy;
    }
  };

  public parseLink = (link: string): LinkData => {
    const parsedLink = this.isValidHttpLink(link);
    if (parsedLink) {
      const youtubeId = youtubeLinkParser(link);
      const tiktokId = tiktokLinkParser(link);
      const imageLink = imageLinkParser(link);
      if (imageLink) {
        return {
          sourceType: LinkType.IMAGE,
          link,
        };
      }
      if (youtubeId) {
        return {
          sourceType: LinkType.YOUTUBE,
          link: `https://www.youtube.com/embed/${youtubeId}`,
        };
      }
      if (tiktokId) {
        return {
          sourceType: LinkType.TIKTOK,
          link: `https://www.tiktok.com/embed/v2/${tiktokId}`,
        };
      }
      return {
        sourceType: LinkType.DEFAULT,
        link: parsedLink,
      };
    }
    return {
      sourceType: LinkType.IS_NOT_LINK,
      link,
    };
  };
}

export const linkStrategyService = new LinkStrategyService();
