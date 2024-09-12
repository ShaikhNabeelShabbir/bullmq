```
npm install
npm run dev
```

```
open http://localhost:3000
```

Steps to use the to use the the application

1. Start the redis server (redis-server)
2. Start the application using npm run dev
3. navigate to src folder (cd src/)
4. use command node worker.js this show the output ie the log statements from the worker
5. http://localhost:3000/schedule-job (authRoutes.post("/schedule-job", scheduleJobController);)
6. scheduleJobController function checks the timestamp and telegrma_id and adds it to the Bull Queue and the database using addScheduledJob and create job function
7. the addScheduledJob checks for the timestamp to be in the future and adds it to the queue and database
8. the worker has access to the the queue and sends the message ass the timestamp is reached

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

A POST request is sent to http://localhost:3000/schedule-job

The API endpoint processes incoming job requests, which must include a telegram_user_id (chat ID) and optionally a timestamp and message.

The scheduleJobController function receives the request data.

Add Job to BullMQ Queue (addScheduledJob):

The worker then sends a message to the Telegram user (via the telegram_user_id) using the Telegram API.
