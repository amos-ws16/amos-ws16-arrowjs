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
                  "inputs": ["file.description | to-upper-case", "tasks[].description"],
                  "params": {
                      "extractKeywords": true
                  }
              }
          }
      },
      "file": {
          "description": "great location for a meeting"
      },
      "tasks": [
      	{
  	    	"id": 1,
  	        "description": "Find a location for the next meeting"
  	    }, {
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
        "context-file-description-task-description": 0.7878787878787878,
        "id": 1,
        "total": 0.7878787878787878
      },
      {
        "context-file-description-task-description": 0.06896551724137931,
        "id": 1,
        "total": 0.06896551724137931
      }
    ]
  }
  ```
