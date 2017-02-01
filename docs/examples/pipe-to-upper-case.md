### Request

  ```javascript
  {
    "idPath": "mappedObjects[].id",
    "token": "YOUR_TOKEN_HERE",
    "config": {
        "aggregator": {"mean": "*"},
        "plugins": {
            "context-file-description-task-description": {
                "use": "similar-text-plugin",
                "inputs": ["file.description | to-upper-case", "tasks[].description"],
                "params": {
                    "extractKeywords": true
                }
            }
        }
    },
    "file": {
        "title": "Cafe abc",
        "type": "jpeg",
        "created_at": 1479755100,
        "user": "5hj34thtr",
        "description": "great location for a meeting"
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
        "context-file-description-task-description": 0.7878787878787878,
        "total": 0.7878787878787878
      },
      {
        "context-file-description-task-description": 0.06896551724137931,
        "total": 0.06896551724137931
      }
    ]
  }
  ```
