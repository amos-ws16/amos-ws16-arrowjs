In this example the file was created in february and 2 tasks were created in february and in january, respectively. With the "similar-text-plugin" in combination with the "month-name-of-year"-pipe the tasks get a score with respect to the similarity of the names of the months.

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
		      "inputs": ["file.created_at | month-name-of-year", "tasks[].created_at | month-name-of-year"]
		    }
		}
   },
   "file": {
     	"title": "february report",
    	"created_at": 1487013296
   },
   "tasks": [
     {
	    	"id": 1,
	     "title": "february meeting",
	     "created_at": 1486408496,
	  	 "due_date": 1486418496
     },
     {
	    	"id": 2,
	     "title": "january meeting",
	     "created_at": 1484334896,
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
      "context-file-timestamp-tasks-timestamp-long": 0.46153846153846156,
      "id": 2,
      "total": 0.46153846153846156
    }
  ],
  "uid": "58a0b446d192384b4dcb52b5"
}
  ```
