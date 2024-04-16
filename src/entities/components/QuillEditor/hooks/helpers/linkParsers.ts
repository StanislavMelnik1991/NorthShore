export const youtubeLinkParser = (link: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

export const tiktokLinkParser = (link: string) => {
  const regExp =
    /^.*((tiktok.com\/)|(v\/)|(\/u\/\w\/)|(video\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = link.match(regExp);
  return match?.[7] || null;
};

export const imageLinkParser = (link: string) => {
  const regExp =
    /^(http|https):\/\/[\w\-.]+\.[\w-]+(\.[\w-]+)*(:[0-9]+)?(\/\S*)?(\.jpg|\.jpeg|\.png|\.gif)$/;
  const match = regExp.test(link);
  return match || null;
};
