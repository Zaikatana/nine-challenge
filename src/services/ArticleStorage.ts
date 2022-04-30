import { Errors } from "../errors";
import { Article } from "../types/articles.type";
import { Tag, TagInformation } from "../types/tags.types";

// Article Storage Service for virtual storage of Articles
export class ArticleStorage {
  static articles: Map<string, Article> = new Map();
  static tagArticles: Map<Tag, string[]> = new Map();
  static dateArticles: Map<string, string[]> = new Map();

  static getArticleById = (id: string): Article => {
    if (!this.articles.get(id)) {
      throw Errors.INVALID_ARTICLE_ID;
    }
    return this.articles.get(id)!;
  };

  static getTagByNameAndDate = (
    tagName: string,
    date: string
  ): TagInformation => {
    const relatedArticles: string[] | undefined = this.tagArticles.get(
      tagName as Tag
    );
    if (!relatedArticles) {
      throw Errors.INVALID_TAG;
    }

    // Generate Related Tags & count
    const relatedTags: Map<string, boolean> = new Map();
    let count = 0;
    relatedArticles.forEach((articleId) => {
      const article = this.articles.get(articleId);
      if (article!.date === date) {
        count += 1;
        article!.tags.forEach((tag) => {
          if (tag !== tagName && !relatedTags.get(tag)) {
            relatedTags.set(tag, true);
          }
        });
      }
    });

    // Retrieves all articles that were made for provided date
    const articles: string[] | undefined = this.dateArticles.get(date);
    if (!articles) {
      throw Errors.ARTICLE_DATE_ERROR;
    }

    const tagInformation = {
      tag: tagName,
      count,
      // Return last 10 items in articles array
      articles: articles.slice(articles.length - 10),
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
    const date = data.date;
    if (this.dateArticles.get(date)) {
      const dateArticlesArr = this.dateArticles.get(date);
      dateArticlesArr!.push(id);
      this.dateArticles.set(date, dateArticlesArr!);
    } else {
      this.dateArticles.set(date, [id]);
    }
  };

  static getSize = (): number => {
    return this.articles.size;
  };
}
