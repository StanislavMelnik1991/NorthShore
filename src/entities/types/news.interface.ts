export type INews = {
  id: number;
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
  is_draft: number;
  created_at: number;
  updated_at: number;
  html_content: string;
  published_at: number;
};
