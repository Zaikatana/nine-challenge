import { Article } from "../types/articles.type";
import { Tag, TagInformation } from "../types/tags.types";

enum ArticleStorageErrors {
  INVALID_TAG = "Invalid Tag",
}

export class ArticleStorage {
  static articles: Map<string, Article> = new Map();
  static tagArticles: Map<Tag, string[]> = new Map();

  static getArticleById = (id: string): Article | undefined => {
    return this.articles.get(id);
  };

  static getTagByNameAndDate = (
    tagName: string,
    date: string
  ): TagInformation => {
    const relatedArticles: string[] | undefined = this.tagArticles.get(
      tagName as Tag
    );
    if (!relatedArticles) {
      throw ArticleStorageErrors.INVALID_TAG;
    }

    const articles: string[] = [];
    const relatedTags: Map<string, boolean> = new Map();
    // TODO: Try to find O(n) method or better to do this...
    relatedArticles.forEach((articleId) => {
      const article = this.articles.get(articleId);
      if (article!.date === date) {
        articles.push(articleId);
      }

      article!.tags.forEach((tag) => {
        if (tag !== tagName && !relatedTags.get(tag)) {
          relatedTags.set(tag, true);
        }
      });
    });

    const tagInformation = {
      tag: tagName,
      count: articles.length,
      articles,
      related_tags: Array.from(relatedTags.keys()),
    };

    return tagInformation;
  };

  static insertArticle = (id: string, data: Article): void => {
    this.articles.set(id, data);
    data.tags.forEach((tag) => {
      if (this.tagArticles.get(tag)) {
        const tagArticlesArr = this.tagArticles.get(tag);
        tagArticlesArr!.push(id);
        this.tagArticles.set(tag, tagArticlesArr!);
      } else {
        this.tagArticles.set(tag, [id]);
      }
    });
  };

  static getSize = (): number => {
    return this.articles.size;
  };
}
