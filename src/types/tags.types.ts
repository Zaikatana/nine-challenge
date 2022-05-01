export type Tag = string;

export type TagInformation = {
  tag: Tag;
  count: number;
  articles: string[];
  related_tags: Tag[];
};

// GET /tags request parameters
export type TagGETReqParams = {
  tagName: string;
  date: string;
};

// GET /tags response body
export type TagGETRes = TagInformation;
