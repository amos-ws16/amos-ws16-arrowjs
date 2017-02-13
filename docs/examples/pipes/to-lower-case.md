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
                  "inputs": ["file.description | to-lower-case", "tasks[].description"],
                  "params": {
                      "extractKeywords": true
                  }
              }
          }
      },
      "file": {
          "description": "GREAT LOCATION FOR A MEETING"
      },
      "tasks": [
      	{
  	        "id": 1,
  	        "description": "Find a location for the next meeting"
  	    }, {
  	    	"id": 1,
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
        "total": 0.7878787878787878
      },
      {
        "context-file-description-task-description": 0.06896551724137931,
        "total": 0.06896551724137931
      }
    ],
    "uid": "58a0b5f8d192384b4dcb52bb"
  }
  ```
