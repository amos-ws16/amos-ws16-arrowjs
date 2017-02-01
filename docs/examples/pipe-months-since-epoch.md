### Request

  ```javascript
  {
    "idPath": "mappedObjects[].id",
    "token": "YOUR_TOKEN_HERE",
    "config": {
        "aggregator": {"mean": "*"},
        "plugins": {
          "context-file-timestamp-tasks-timestamp-long": {
      "use": "close-time-plugin",
      "inputs": ["file.created_at | months-since-epoch", "tasks[].created_at | months-since-epoch"]
    }
        }
    },
    "file": {
        "title": "Cafe abc",
        "type": "jpeg",
        "created_at": 1479755100,
        "user": "5hj34thtr",
        "description": "Great location for a meeting"
    },
    "tasks": [{
        "title": " find a location",
        "created_at": 1479754800,
        "due_date": 1479766305,
        "created_by": "ikgDG94s",
        "description": "Find a location for the next meeting"
    }, {
        "title": " Check your mails",
        "created_at": 1379754800,
        "due_date": 1454353454,
        "created_by": "dfgj2s334",
        "description": "Check your mails before you leave."
    }]
  }
  ```

### Response

  ```javascript
  {
    "success": true,
    "result": [
      {
        "context-file-timestamp-tasks-timestamp-long": 1,
        "total": 1
      },
      {
        "context-file-timestamp-tasks-timestamp-long": 0.9366666666666666,
        "total": 0.9366666666666666
      }
    ]
  }
  ```
