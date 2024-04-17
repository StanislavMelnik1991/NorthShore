export const imageParser = (content: string) => {
  const linkSet = new Set<string | null>([]);
  const contentElement = document.createElement('div');
  contentElement.innerHTML = content;

  const allImages = contentElement.querySelectorAll('img');
  allImages.forEach((image) => {
    const link = image.getAttribute('src');
    return linkSet.add(link);
  });

  const allYoutubeVideos = contentElement.querySelectorAll('iframe.youtube');
  allYoutubeVideos.forEach((video) => {
    const id = youtubeLinkParser(video.getAttribute('src') || '');
    linkSet.add(`https://img.youtube.com/vi/${id}/0.jpg`);
  });

  return Array.from(linkSet).filter((val) => !!val) as Array<string>;
};

const youtubeLinkParser = (link: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};
