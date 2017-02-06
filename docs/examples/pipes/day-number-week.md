### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
    	"idPath": "tasks[].id",
   	"aggregator": {"mean": "*"},
   	"plugins": {
    "context-file-timestamp-tasks-timestamp-long": {
      "use": "close-time-plugin",
      "inputs": ["file.created_at | day-number-of-week", "tasks[].created_at | day-number-of-week"],
      "params": { "time-limit": 1 }
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
      "context-file-timestamp-tasks-timestamp-long": 0,
      "id": 2,
      "total": 0
    }
  ]
}
  ```
