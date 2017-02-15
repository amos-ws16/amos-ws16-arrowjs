### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
      "idPath": "tasks[].id",
      "aggregator": {
        "mean": "*"
      },
      "plugins": {
        "compare-chat": {
          "use": "chat-text-plugin",
          "inputs": [
            "tasks[].chat",
            "file.title"
          ],
          "params": {
            "startTime": 300,
            "endTime": 600
          }
        }
      }
    },
    "file": {
      "title": "Hello world"
    },
    "tasks": [
      {
        "id": 1,
        "chat": [
          {
            "type": "message",
            "text": "test test",
            "channel": "C2147483705",
            "user": "abc",
            "ts": 200
          },
          {
            "type": "message",
            "text": "Hello world",
            "channel": "C2147483705",
            "user": "def",
            "ts": 400
          },
          {
            "type": "message",
            "text": "Hello hello",
            "channel": "C2147483705",
            "user": "ghi",
            "ts": 1200
          }
        ]
      },
      {
        "id": 2,
        "chat": [
          {
            "type": "message",
            "text": "Hello world",
            "channel": "C2147483705",
            "user": "def",
            "ts": 500
          },
          {
            "type": "message",
            "text": "no match",
            "channel": "C2147483705",
            "user": "abc",
            "ts": 500
          },
          {
            "type": "message",
            "text": "out of intervall",
            "channel": "C2147483705",
            "user": "ghi",
            "ts": 1200
          }
        ]
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
        "compare-chat": 1,
        "id": 1,
        "total": 1
      },
      {
        "compare-chat": 0.5,
        "id": 2,
        "total": 0.5
      }
    ],
    "uid": "UID"
  }
  ```
