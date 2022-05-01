# Channel Nine Coding Challenge

This is my solution for the the Article API Coding Challenge. Written in primarily in TypeScript hosted in NodeJS.

## Installation & Running
Prereq: Requires Yarn or Node to be installed
1. Run `yarn install` or `npm install`
2. Run `yarn start` or `npm start` on Mac/Unix/Windows

## APIs available
The following API endpoints are available to be called either with POSTman or curl:
- `POST /articles`
Handles the receipt of some article data in json format, and store it within the service.

**Example Request**
```
{
  "title": "latest science shows that potato chips are better for you than sugar",
  "body": "some text, potentially containing simple markup about how potato chips are great",
  "tags": ["health", "fitness","science"]
}
```

**Example Response**
```
{
  "id": "1"
}
```

- `GET /articles/{id}`
Returns the JSON representation of an article.

**Example Response**
```
{
  "id": "1",
  "title": "latest science shows that potato chips are better for you than sugar",
  "date" : "2016-09-22",
  "body" : "some text, potentially containing simple markup about how potato chips are great",
  "tags" : ["health", "fitness", "science"]
}
```

- `GET /tags/{tagName}/{date}`
Returns the list of articles that have that tag name on the given date and some summary data about that tag for that day. Date is in the format YYYYMMDD.

**Example Response**
```
{
  "tag" : "health",
  "count" : 2,
    "articles" :
      [
        "1",
        "7"
      ],
    "related_tags" :
      [
        "science",
        "fitness"
      ]
}
```