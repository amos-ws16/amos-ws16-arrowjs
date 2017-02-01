### Request

  ```javascript
  {
    "idPath": "mappedObjects[].id",
    "token": "YOUR_TOKEN_HERE",
    "config": {
        "aggregator": {"mean": "*"},
        "plugins": {
            "compare-chat": {
                "use": "similar-text-plugin",
                "inputs": ["file.title", "context | chat"]
            }
        }
    },
    "file": {
        "title": "world of cafe",
        "type": "jpeg",
        "created_at": 1479755100,
        "user": "5hj34thtr",
        "description": " Great location for a meeting"
    },
    "context": {
      "chat": [
        {
          "type": "message",
          "channel": "C2147483705",
          "user": "U2147483697",
          "text": "Hello cafe world!",
          "ts": 1355517523.000005
        },
        {
          "type": "message",
          "channel": "C2147483705",
          "user": "U2147483698",
          "text": "Hello bar underworld!",
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
        "compare-chat": 0.5384615384615384,
        "total": 0.5384615384615384
      }
    ]
  }
  ```
