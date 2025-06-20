type Url = {
  id: string;
  url: string;
  shortUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

type Query = {
  url(url: string): Url;
};

