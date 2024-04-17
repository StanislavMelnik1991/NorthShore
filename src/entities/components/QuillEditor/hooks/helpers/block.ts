import { Quill } from 'react-quill';
import { LinkData, LinkType } from './linkStrategy';

const BlockEmbed = Quill.import('blots/block/embed');

class VideoBlot extends BlockEmbed {
  static blotName = 'embedVideo';
  static tagName = 'figure';

  static create(value: LinkData) {
    const node = super.create(value);
    node.classList.add('video-container');
    node.style.margin = '0';

    const wrapper = document.createElement('div');
    wrapper.classList.add('video-wrapper');

    const video = document.createElement('iframe');
    video.setAttribute('src', value.link);
    video.classList.add('ql-video', 'content-video', value.sourceType);
    video.setAttribute('allowfullscreen', 'true');
    video.setAttribute('frameBorder', '0');
    if (value.sourceType === LinkType.TIKTOK) {
      video.style.width = '323px';
      video.style.aspectRatio = '323 / 740';
      video.style.margin = '0 auto 0 0';
      video.style.overflow = 'hidden';
    }
    if (value.sourceType === LinkType.YOUTUBE) {
      video.style.width = '100%';
      video.style.aspectRatio = '800 / 450';
      video.style.margin = '0 auto';
      video.style.overflow = 'hidden';
    }

    wrapper.appendChild(video);
    node.appendChild(wrapper);

    return node;
  }

  static value(node: Document) {
    const videoEl = node.querySelector('.content-video');
    if (!videoEl) {
      return null;
    }
    const link = videoEl.getAttribute('src');
    if (videoEl.classList.contains(LinkType.TIKTOK)) {
      return {
        sourceType: LinkType.TIKTOK,
        link,
      };
    }
    if (videoEl.classList.contains(LinkType.YOUTUBE)) {
      return {
        sourceType: LinkType.YOUTUBE,
        link,
      };
    }
    return null;
  }
}

Quill.register('blots/block/embedVideo', VideoBlot, false);
