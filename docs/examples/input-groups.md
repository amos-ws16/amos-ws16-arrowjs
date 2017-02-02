### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
      "idPath": "mappedObjects[].id",
      "aggregator": { "mean": "*" },
      "plugins": {
        "compare-text": {
          "use": "similar-text-plugin",
          "inputGroup": [ [ "object.title", "object.text" ], [ "mappedObjects[].text" ] ],
          "params": { "extractKeywords": false }
        }
      }
    },
    "object": {
      "title": "different title",
      "text": "some text that could be similar"
    },
    "mappedObjects": [
        {
          "id": 1,
          "text": "similar" },
        {
          "id": 2,
          "text": "different"
        }
    ]
  }
  ```

### Response

  ```javascript
  {
    "success": true,
    "result": [
      {
        "compare-text-object.title-mappedObjects.text": 0,
        "compare-text-object.text-mappedObjects.text": 0.46153846153846156,
        "id": 1,
        "total": 0.23076923076923078
      },
      {
        "compare-text-object.title-mappedObjects.text": 0.8,
        "compare-text-object.text-mappedObjects.text": 0,
        "id": 2,
        "total": 0.4
      }
    ]
  }
  ```
