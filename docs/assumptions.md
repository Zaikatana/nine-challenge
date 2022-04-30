# List of Assumptions

Below are the major assumptions made whilst working with the spec provided.
- `POST /articles`
    - Request body was not defined, thus I used the following schema as the body when calling `POST /articles`
    ```
    {
        "title": "latest science shows that potato chips are better for you than sugar",
        "body": "some text, potentially containing simple markup about how potato chips are great",
        "tags": ["health", "fitness","science"]
    }
    ```
    - Response body was not defined, thus I used the following schema for the response
    ```
    {
        "id": "1"
    }
    ```
    - Minimum and Maximum length of title, body and tag items were unknown, therefore I've added validations to ensure that a minimum size of 1 character was allocated for each. No maximum value was set.
    - Minimum and Maximum length for the tags array were unknown, therefore I've added validations to ensure that a minimum size of 1 item was allocated. No maximum value was set.
    - ID was assumed to be an integer converted into a string based on what was present on spec. The first entry added will have an ID of "0".
    - Validations would only be performed to ensure 2 articles will not have the same ID. I have made it so that 2 Articles can share the same title, body and tags.
    - All tags are unique, of type string and not empty. Validation is in place to ensure this.
    - Title and Body are strings. Validation is in place to ensure this.
    
- `GET /articles/{id}`
    - Response body was not defined, thus I used the following schema for the response which I believe is an appropriate JSON representation of an Article
    ```
    {
        "id": "1",
        "title": "latest science shows that potato chips are better for you than sugar",
        "date" : "2016-09-22",
        "body" : "some text, potentially containing simple markup about how potato chips are great",
        "tags" : ["health", "fitness", "science"]
    }
    ```
    - Date was assumed to be in the format YYYY-MM-DD based on the JSON provided in the spec.
    - If no ID is provided 404 is thrown
    - If an invalid ID is provided, a 400 response is thrown with an Invalid Article error.

- `GET /tags/{tagName}/{date}`
    - Date parameter provided is in the format YYYYMMDD.
    - If an invalid date/invalid date format is provided, a 400 response is thrown with an Invalid Date error.
    - Minimum and Maximum date were unknown, I've assumed that there was no limit for this.
    - For Articles, if 12 articles were created at the same time, then 10 of those 12 articles will be returned to fit the 10 article requirement