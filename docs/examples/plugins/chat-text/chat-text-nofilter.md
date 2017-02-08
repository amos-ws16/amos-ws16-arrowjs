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
            "inputs": ["tasks[]", "file.title"]
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
    	{
    	  "id": 2,
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
