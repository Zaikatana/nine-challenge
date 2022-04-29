export type Tag = string;

export type TagInformation = {
  tag: Tag;
  count: number;
  articles: string[];
  related_tags: Tag[];
};

export type TagGETRes = TagInformation;
