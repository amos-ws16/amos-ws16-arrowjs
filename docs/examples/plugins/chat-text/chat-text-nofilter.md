### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
      "idPath": "tasks[].id",
      "aggregator": { "mean": "*" },
      "plugins": {
        "compare-chat": {
            "use": "chat-text-plugin",
            "inputs": ["file.chat", "tasks[].title"]
        }
      }
    },
    "file": {
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
    },
    "tasks": [
    	{
    	  "id": 1,
        "title": "Hello world"
    	},
    	{
    	  "id": 2,
        "title": "Hello underworld"
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
        "compare-chat": 0.8809523809523809,
        "id": 1,
        "total": 0.8809523809523809
      },
      {
        "compare-chat": 0.8809523809523809,
        "id": 2,
        "total": 0.8809523809523809
      }
    ]
  }
  ```
