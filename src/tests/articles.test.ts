import { ArticleStorage } from "../services/ArticleStorage";
import { testArticles } from "./articleTestData";
import request from "supertest";
import server from "../server";
import { Article } from "../types/articles.type";
import { Errors } from "../errors";

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
      expect(res.statusCode).toBe(200);
      const resData = res.body as Article;
      expect(resData.id).toBe(testArticles[0].id);
      expect(resData.title).toBe(testArticles[0].title);
      expect(resData.body).toBe(testArticles[0].body);
    });

    it("should return an error message if a blank invalid ID is provided", async () => {
      const res = await request(server).get(`${baseUrl}/`);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(404);
      const resData = res.body;
      expect(resData.error).toBe(Errors.INVALID_PATH);
    });

    it("should return an error message if an invalid ID is provided", async () => {
      const res = await request(server).get(`${baseUrl}/asudhkahw`);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(400);
      const resData = res.body;
      expect(resData.error).toBe(Errors.INVALID_ARTICLE_ID);
    });
  });

  describe("POST Cases", () => {
    it("should successfully add an article if a valid body is provided", async () => {
      const data = {
        title: "test 7",
        body: "test body 7",
        tags: ["tagD"],
      };
      const res = await request(server).post(`${baseUrl}/`).send(data);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(200);
      const resData = res.body;
      expect(resData.id).toBe("16")
    });

    it("should return an error message if a blank body is provided", async () => {
        const data = {};
        const res = await request(server).post(`${baseUrl}/`).send(data);
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400);
        const resData = res.body;
        expect(resData.error).toBeDefined();
    });

    it("should return an error message if a gibberish body is provided", async () => {
        const data = {
            asjdha: "abwuihauw",
            iqnwfgani: "sjdkasd",
            sjwija: 0,
        };
        const res = await request(server).post(`${baseUrl}/`).send(data);
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400);
        const resData = res.body;
        expect(resData.error).toBeDefined();
    });

    it("should return an error message if an invalid body is provided", async () => {
        const data = {
            id: 24,
            title: "test invalid",
            body: "test body invalid",
            tags: [],
        };
        const res = await request(server).post(`${baseUrl}/`).send(data);
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400);
        const resData = res.body;
        expect(resData.error).toBeDefined();
    });
  });
});
