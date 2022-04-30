import { ArticleStorage } from "../services/ArticleStorage";
import { testArticles } from "./articleTestData";
import request from "supertest";
import server from "../server";

describe("/articles Test Cases", () => {
  const baseUrl = "/articles";

  beforeAll(() => {
    testArticles.forEach((article, i) => {
      ArticleStorage.insertArticle(i.toString(), article);
    });
  });

  afterAll(() => {
    server.close();
  });

  describe("GET Cases", () => {
    it("should return an article if a valid ID is provided", async () => {
        const res = await request(server).get(`${baseUrl}/0`);
        expect(res).toBeDefined();
    });
  });

  describe("POST Cases", () => {});
});
