### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
	    "idPath": "tasks[].id",
        "aggregator": {"mean": "*"},
        "plugins": {
            "compare-chat": {
                "use": "similar-text-plugin",
                "inputs": ["file.title", "tasks[] | chat"]
            }
        }
    },
    "file": {
        "title": "world of cafe"
    },
    "tasks": [
    	{
    	    "id": 1,
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
        },
        {
    	    "id": 2,
	        "chat": [
	            {
		            "type": "message",
		            "channel": "C2147483705",
		            "user": "U2147483697",
		            "text": "Not similar",
		            "ts": 1355517523.000005
	            },
	            {
		            "type": "message",
		            "channel": "C2147483705",
		            "user": "U2147483698",
		            "text": "Something else",
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
      "compare-chat": 0.5384615384615384,
      "id": 1,
      "total": 0.5384615384615384
    },
    {
      "compare-chat": 0,
      "id": 2,
      "total": 0
    }
  ]
}
  ```
