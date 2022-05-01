# Solution Description
I have decided to code the Article API in TypeScript, which is a transpiled version of JavaScript which includes a Type Checking feature that is useful for checking code for Type errors during code compilation. It is also the language that I am the most familiar with.
This solution allows for users to call 3 different API endpoints:
- `GET /articles/{id}` which returns a JSON representation of an Article
- `POST /articles` which handles the receipt of some article data in JSON format, and stores it within the `ArticleStorage` service.
- `GET /tags/{tagName}/{date}` which returns the list of articles that has that tag name on the given date and some summary data about the tag for that day.

To handle the storage, insertion and retrieval of Article data, I have implemented an `ArticleStorage` service, which utilises 2 HashMaps to store Articles based on an ID key, and a list of Article IDs based on a tag key. The schema would look something like this:
```
articles {
    id: string,
    article: Article,
}

tagArticles {
    tag: Tag,
    articles: string[]
}
```
where Tag and Article are custom types.
There are also 4 different functions:
- `getArticleById(id: string)` which returns an article based on the ID provided, mainly used for `GET /articles/{id}`
- `getTagByNameAndDate(tagName: string, date: string)` which returns a TagInformation object, mainly used for `GET /tags/{tagName}/{date}`
- `insertArticle(id: string, data: Article)` which inserts an article in the articles HashMap and creates a tag entry in the tagArticles HashMap, mainly used for `POST /articles`
- `getSize()` which retrieves the size of the articles HashMap, generally used to assign an ID to a new article when `POST /articles` is called.
While HashMaps were mostly used for it's O(1) lookup of Articles and Articles with a certain Tag, realistically, I would probably utilise a SQL database to optimise storage and function runtime, however for the purpose of keeping the solution lightweight, I have decided against it.

## Code Structure
The Code has been split into several folders and files, below are the notable ones.
- `src/controllers` 
Controller files handle API requests received from routes, parses them and calls the relevant service functions to process the request. All functions will return a 200/400 response. Error handling is also performed at this level to ensure the appropriate response is returned.
- `src/routes` 
Routes files houses the possible API routes that can be called through the server. When an API endpoint is called, it will pass through the appropriate endpoint in route, which will call the appropriate controller. For `POST /articles` there is request body validation which occurs in the route file.
- `src/services` 
Services only contains ArticleStorage, which manages the storage, retrieval and insertion of Article types.
- `src/tests`
Tests contain unit test files which are picked up by JestJS to execute. They cover simple happy path and negative scenarios.
- `src/types`
As we are using TypeScript, it is important for custom types for articles and tags to be defined for compilation purposes. These types are stored here. The schemas used for request body validation is also found here.
- `src/errors.ts`
Contains error messages as well as a function used by ajv (JSON validator) to validate request bodies.
- `src/server.ts`
Primary script used to run the HTTP API server

## Testing Approach
I used JestJS to create simple unit tests which assess the existing endpoints with happy path and some negative path scenarios. Article test data is stored in `src/tests/articleTestData.ts`. You can run these tests by running `yarn test` or `npm test` in terminal.

## Libraries Used
- [ExpressJS](https://expressjs.com/) - back-end web application framework used to setup the application as an API Server.
- [JestJS](https://jestjs.io/) - Testing framework used to set up unit testing for the `/articles` and `/tags` endpoints.
- [Babel](https://babeljs.io/) - Required to use Jest with TypeScript Applications. Babel is a JavaScript compiler that converts modern JavaScript into Browser-Compatible JavaScript.
- [Supertest](https://github.com/visionmedia/supertest) - Used together with JestJS to test HTTP API Applications.
- [ajv](https://ajv.js.org/) - JSON Validator, used to validate `POST /articles` request body.
- [MomentJS](https://momentjs.com/) - JavaScript library to parse, validate and display date/time. Mostly used for the date field and parameters in `GET /tags` & `POST /articles`
- [Nodemon](https://nodemon.io/) - Not a critical library for the project to run, however it is useful while developing, as it re-compiles and runs the API application every time the code is modified.

## Reflection
This was a really fun exercise. While I had experience working on APIs, this was probably the first time that I have made an API completely from scratch, and I am rather pleased with how it turned out. 
There were indeed some improvements that I would like to implement if I had more time.
- Request body validation for `POST /articles` requests are currently reliant on the ajv library. It would be nice to replace the error messages returned with something that is more readable to the user. Generating Schemas for each `POST` request can also create alot of bloat in the case that this becomes an API endpoint that has multiple `POST` requests.
- Due to not using a relational database, there may be some issues with scaling with the existing implementation of ArticleStorage. Firstly, the tagArticles HashMap has a space complexity of O(n*m), where n are the amount of Tags and m is the max amount of Article ID strings. When there are hundreds of tags and thousands of Article IDs, this may be a situation where we want to use an actual relational database.
- When `GET /tags` is called, the process of generating related_tags is a bit inefficient, using a nested for loop to firstly loop through all articles for a given tag, then looping through the tags for each article to find related tags. This results in a time complexity of O(n^2). While there are no issues if there are only a few articles for each tag, this solution is not scalable. A potential solution is to use a relational database.