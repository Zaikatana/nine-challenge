import { ArticleStorage } from "../services/ArticleStorage";
import { testArticles } from "./articleTestData";
import request from "supertest";
import server from "../server";
import { Errors } from "../errors";

describe("/articles Test Cases", () => {
  const baseUrl = "/tags";

  beforeAll(() => {
    testArticles.forEach((article, i) => {
      ArticleStorage.insertArticle(i.toString(), article);
    });
  });

  afterAll(() => {
    server.close();
  });

  describe("GET Cases", () => {
    it("should return an article if a valid tag & date is provided", async () => {
      const res = await request(server).get(`${baseUrl}/tagA/20220430`);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(200);
      const resData = res.body;
      expect(resData.tag).toBe("tagA");
      expect(resData.count).toBe(8);
      expect(resData.articles).toHaveLength(10);
      expect(resData.articles).toEqual([
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
      ]);
      expect(resData.related_tags).toHaveLength(2);
      expect(resData.related_tags).toEqual(
        expect.arrayContaining(["tagB", "tagC"])
      );
    });

    it("should return an error message if an invalid tag is provided", async () => {
      const res = await request(server).get(`${baseUrl}/tagD/20220430`);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(400);
      const resData = res.body;
      expect(resData.error).toBe(Errors.INVALID_TAG);
    });

    it("should return an error message if an invalid date is provided", async () => {
      const res = await request(server).get(`${baseUrl}/tagA/2022-04-30`);
      expect(res).toBeDefined();
      expect(res.statusCode).toBe(400);
      const resData = res.body;
      expect(resData.error).toBe(Errors.INVALID_DATE);
    });
  });
});
