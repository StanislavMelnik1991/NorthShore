import { IMockData } from '../types/mockData.interface';

export const mockImagesUpload: IMockData = {
  url: 'https://testapi.ru/upload',
  method: 'POST',
  status: 200,
  response: {
    data: {
      id: 0,
      url: 'https://northwaterfront.evocontrols.com/files/b654ab99781ad3fc.jpg',
      name: 'image.jpg',
      size: 4896816,
      user_id: 89,
      data_add: 1712683150,
      filename:
        'https://northwaterfront.evocontrols.com/files/b654ab99781ad3fc.jpg',
    },
    hash: 'afde444fa91a88fc240b1eec4217e468',
    success: true,
    timestamp: 1712081646,
  },
  disable: false,
  disableUsingOriginal: false,
  ignoreQueryParams: true,
  refreshStoryOnUpdate: true,
};
