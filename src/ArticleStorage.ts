import { Article } from "./types/articles.type";
import { TagInformation } from "./types/tags.types";

export class ArticleStorage {
    static articles: Map<string, Article> = new Map();

    static getArticleById = (id: string): Article => {
        return this.articles.get(id);
    }

    static getTagByNameAndDate = (tagName: string, date: string): TagInformation => {
        const articlesSize = this.getSize();
        const relatedArticles: Article[] = [];
        let count = 0;
        for (let i = 0; i <= articlesSize; i++) {
            if (this.articles.get(i.toString())) {
                const article = this.articles.get(i.toString());
                const articleIncludesTag = article.tags.includes(tagName)
                if (article.date === date && articleIncludesTag) {
                    relatedArticles.push(article);
                }
                if (articleIncludesTag) {
                    count += 1;
                }
            }
        }

        const articles: string[] = [];
        const related: Map<string, boolean> = new Map();
        relatedArticles.forEach((article) => {
            articles.push(article.id);
            article.tags.forEach((tag) => {
                if (tag !== tagName && !related.get(tag)) {
                    related.set(tag, true);
                }
            })
        });
        const tagInformation = {
            tag: tagName,
            count,
            articles,
            related_tags: Array.from(related.keys()),
        }

        return tagInformation;
    }

    static insertArticle = (id: string, data: Article): void => {
        this.articles.set(id, data);
    }

    static getSize = (): number => {
        return this.articles.size;
    }
}