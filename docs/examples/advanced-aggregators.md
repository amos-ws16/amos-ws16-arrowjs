### Request

  ```javascript
  {
  "token": "YOUR_TOKEN_HERE",
  "config": {
    "idPath": "mappedObjects[].id",
    "aggregator": {
      "weighted-mean": [
        [4, { "mean": [ "compare-text2", "compare-text3" ] } ],
        [1, { "weighted-mean": [ [5, "compare-text1"], [2, "compare-text2"] ] } ],
        [2, { "max": [
          { "mean": "*" },
          { "or": [ "compare-text1", "compare-text2", "compare-text3" ] }
        ] }]
      ]
    },
    "plugins": {
      "compare-text1": {
        "use": "similar-text-plugin",
        "inputs": [ "object.title", "mappedObjects[].text1"]
      },
      "compare-text2": {
        "use": "similar-text-plugin",
        "inputs": [ "object.title", "mappedObjects[].text2"]
      },
      "compare-text3": {
        "use": "similar-text-plugin",
        "inputs": [ "object.title", "mappedObjects[].text3"]
      }
    }
  },
  "object": {
    "title": "my title"
  },
  "mappedObjects": [
      {
        "id": 1,
        "text1": "my title",
        "text2": "almost my title",
        "text3": "different"
      }
  ]
}
  ```

### Response
{
  "success": true,
  "result": [
    {
      "compare-text1": 1,
      "compare-text2": 0.6666666666666666,
      "compare-text3": 0,
      "id": 1,
      "total": 0.6054421768707483
    }
  ]
}
