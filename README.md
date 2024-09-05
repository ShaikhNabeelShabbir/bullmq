```
npm install
npm run dev
```

```
open http://localhost:3000
```

Steps to use the to use the the application

1. Start the redis server (redis-server)
2. Start the application using npmrun dev
3. navigate to src folder (cd src/)
4. use command node worker.js this show the output ie the log statements from the worker

Create the Job
http://localhost:3000/schedule-job (POST)
{
"timestamp": 1725529560000
} //sample input for postman

Delete the Job
http://localhost:3000/schedule-job (DELETE)
{
"jobId":"11"
} //sample input for postman

Update the Job
http://localhost:3000/schedule-job (PATCH)
{
"oldJobId":"15",
"newTimestamp":1725529620000,
"newJobId":"999"
}//sample input for postman
