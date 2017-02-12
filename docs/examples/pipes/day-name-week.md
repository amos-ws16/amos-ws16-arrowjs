### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
    	"idPath": "tasks[].id",
        "aggregator": {"mean": "*"},
       	"plugins": {
	        "context-file-timestamp-tasks-timestamp-long": {
	          "use": "similar-text-plugin",
	          "inputs": ["file.created_at | day-name-of-week", "tasks[].created_at | day-name-of-week"]
	        }
	    }
    },
    "file": {
      	"title": "monday report",
     	"created_at": 1487013296
    },
    "tasks": [
      {
	    	"id": 1,
 	     "title": "monday meeting",
 	     "created_at": 1486408496,
 	  	 "due_date": 1486418496
      },
      {
	    	"id": 2,
 	     "title": "wednesday meeting",
 	     "created_at": 1486581296,
 	  	 "due_date": 1486681296
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
      "context-file-timestamp-tasks-timestamp-long": 1,
      "id": 1,
      "total": 1
    },
    {
      "context-file-timestamp-tasks-timestamp-long": 0.3076923076923077,
      "id": 2,
      "total": 0.3076923076923077
    }
  ],
  "uid": "58a0b3b9d192384b4dcb52b3"
}
  ```
