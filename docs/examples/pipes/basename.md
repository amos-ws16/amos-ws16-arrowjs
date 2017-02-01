### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
    	"idPath": "tasks[].id",
        "aggregator": {"mean": "*"},
        "plugins": {
            "context-file-description-task-description": {
                "use": "similar-text-plugin",
                "inputs": ["file.title | basename", "tasks[].description"],
                "params": {
                    "extractKeywords": true
                }
            }
        }
    },
    "file": {
        "title": "meeting.pdf"
    },
    "tasks": [
    	{
	    	"id": 1,
	        "description": "Find a location for the next meeting"
	    },
	    {
	    	"id": 2,
	        "description": "Check your mails before you leave."
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
        "context-file-description-task-description": 0.5454545454545454,
        "id": 1,
        "total": 0.5454545454545454
      },
      {
        "context-file-description-task-description": 0,
        "id": 2,
        "total": 0
      }
    ]
}
  ```
