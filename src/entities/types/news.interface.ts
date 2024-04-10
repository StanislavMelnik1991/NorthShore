export type INews = {
  id: number;
  cover?: string;
  user: {
    id: number;
    name: string;
    group: {
      id: number;
      name: string;
    };
    avatar: null;
    status: {
      id: number;
      name: string;
    };
  };
  title: string;
  user_id: number;
  is_draft: 0 | 1;
  created_at: number;
  updated_at: number;
  html_content: string;
  published_at: number;
};
