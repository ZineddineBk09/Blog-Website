export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export interface Article {
  id: string;
  banner: string;
  body: string;
  brief: string;
  category: string;
  postLength: string;
  published: {
    seconds: number;
    nanoseconds: number;
  };
  title: string;
}
