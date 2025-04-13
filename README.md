it is just a 4fun project made with love (or not) and much coffee (and AI)


Examples of queries


 Shorten a URL
```graphql
mutation {
  shortenURL(url: "https://openai.com") {
    code
    url
  }
}
```


 Get a URL
```graphql
query {
  getURL(code: "abc123") {
    url
  }
}
```

 Update a URL
```graphql
mutation{
  updateURL(code: "abc123", newURL: "https://platform.openai.com") {
    code
    url
  }
}
```

 Delete a URL
```graphql
mutation {
  deleteURL(code: "abc123")
}
```
