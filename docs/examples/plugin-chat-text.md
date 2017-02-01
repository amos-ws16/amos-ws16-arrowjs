### Request

  ```javascript
  {
    "idPath": "mappedObjects[].id",
    "token": "YOUR_TOKEN_HERE",
    "config": {
      "aggregator": { "mean": "*" },
      "plugins": {
        "compare-chat": {
          "use": "chat-text-plugin",
          "inputs": ["context", "object.title"]
        }
      }
    },
    "object": {
      "title": "Hello world"
    },
    "context": {
      "chat": [
        {
          "type": "message",
          "channel": "C2147483705",
          "user": "U2147483697",
          "text": "Hello world",
          "ts": 1355517523.000005
        },
        {
          "type": "message",
          "channel": "C2147483705",
          "user": "U2147483698",
          "text": "Hello underworld",
          "ts": 1355517545.000005
        }
      ]
    }
  }
  ```

### Response

  ```javascript
  {
    "success": true,
    "result": [
      {
        "compare-chat": 0.8809523809523809,
        "total": 0.8809523809523809
      }
    ]
  }
  ```
