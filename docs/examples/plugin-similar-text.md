1. Request
  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
      "aggregator": { "mean": "*" },
      "plugins": {
        "compare-text": {
          "use": "similar-text-plugin",
          "inputs": ["object.text", "mappedObjects[].text"],
          "params": { "extractKeywords": true }
        }
      }
    },
    "object": {
      "text": "some text that could be similar"
    },
    "mappedObjects": [
      { "text": "similar" },
      { "text": "this is different" }
    ]
  }
  ```

2. Response
  ```javascript
  {
    "success": true,
    "result": [
      {
        "compare-text": 0.8,
        "total": 0.8
      },
      {
        "compare-text": 0,
        "total": 0
      }
    ]
  }
  ```
