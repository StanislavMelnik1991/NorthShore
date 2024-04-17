import { IMockData } from '../types/mockData.interface';

export const mockNews: IMockData = {
  url: 'https://testapi.ru/news?page=1&perPage=10&searchValue=&filter[is_draft]=1&sort[created_at]=asc',
  method: 'GET',
  status: 200,
  response: {
    data: [
      {
        id: 3,
        user: {
          id: 105,
          name: 'Сотрудник 3',
          group: {
            id: 10,
            name: 'Сотрудник',
          },
          avatar: null,
          status: {
            id: 2,
            name: 'Подтвержден (активен)',
          },
        },
        title: 'Тестовый заголовок 1',
        user_id: 105,
        is_draft: 1,
        created_at: 1712081639,
        updated_at: 1712081639,
        html_content: 'Тестовое наполнение dfsgsdfdsfsd',
        published_at: 1712081639,
      },
      {
        id: 4,
        user: {
          id: 105,
          name: 'Сотрудник 3',
          group: {
            id: 10,
            name: 'Сотрудник',
          },
          avatar: null,
          status: {
            id: 2,
            name: 'Подтвержден (активен)',
          },
        },
        title: 'Избрание председателя правления ',
        user_id: 105,
        is_draft: 0,
        created_at: 1712081639,
        updated_at: 1712081639,
        html_content: `<p>some text</p><p>normal</p><h1>header</h1><h2>header2</h2><p><strong>bold</strong></p><p><em>italic</em></p><p><u>underline</u></p><p><s>error</s></p><blockquote>quotes</blockquote><p>numeric: </p><ol><li>asd</li><li>asd</li><li>asd</li><li>asd</li><li>asd</li></ol><p>doted: </p><ul><li>asd</li><li>asd</li><li>asd</li><li>asd</li><li>asd</li></ul><p class="ql-indent-1">paragraph</p><p><a href="https://main--north-waterfront.netlify.app/" rel="noopener noreferrer" target="_blank">link</a></p><p><br></p><p>image:</p><p><img src="https://signal.avg.com/hs-fs/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/how_to_set_your_default_browser_signal/Signal-How-to-Set-Your-Default-Browser-on-Any-Device-Hero.jpg?width=1200&amp;name=Signal-How-to-Set-Your-Default-Browser-on-Any-Device-Hero.jpg"></p><p><br></p><p>video content:</p><figure class="video-container" style="margin: 0px;"><div class="video-wrapper"><iframe src="https://www.youtube.com/embed/uqZwe01PwnY" class="ql-video content-video youtube" allowfullscreen="true" frameborder="0" style="width: 100%; aspect-ratio: 800 / 450; margin: 0px auto; overflow: hidden;"></iframe></div></figure><p><br></p><p>some text</p><p>some long text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
        published_at: 1712081639,
      },
    ],
    hash: 'afde444fa91a88fc240b1eec4217e468',
    success: true,
    timestamp: 1712081646,
  },
  disable: false,
  disableUsingOriginal: false,
  ignoreQueryParams: true,
  refreshStoryOnUpdate: true,
};
