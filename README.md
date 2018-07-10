
## How to use this template

 - run git clone https://github.com/nooballday/node-cron-scheduler-template.git
 - run npm install or use yarn
 - run npm start or yarn start

## Documentation

**Create New Schedule**
This function is to create a new scheduler that run according to given time, this is how you set up  a new schedule

Go to ``jobs.js`` and edit the JSON export to suit your need

```javascript
/**

* Explore cron at https://crontab.guru

*/

  

module.exports  = [
{
	'cron':'*/5 * * * *',  //cron time run every * * * * * * time
	'file':'dummy_process'  //the name of the file that will be executed
},{
	'cron':'*/5 * * * *',
	'file':'dummy_process2'
}
]

```
The object ``file`` define the file that you will run in ``processes``directory in ``/src/processes``

After adding schedule to ``jobs.js`` create a file with the same name as the one that you added to ``jobs.js`` with this template, of course you can make it however you like.

```javascript
const  logError  =  require('../helper/logger').errorlog

module.exports  =  (req,  res)  =>  {

/**

* Add database request here

*/
	(async  ()  =>  {

	/**

	* TODO: do something here

	*/


	})().catch(e  =>  setImmediate(()  =>  {

	//define your own logERrorMessage

	logError.error({  'message':  e.message,  'process':  __filename.split(/[\\/]/).pop() })

	}))
}
```

The process can also be invoked by a RESTful request, just call it with ``localhost:port/run/filename``, since its a RESTful request you can return a response if you want,

***

**Create new queue and  worker**

Same principal as creating new schedule, you need to add your will-be-jobs to ``queue.js``

```javascript
module.exports  = [
	{
		'name':  'email_sender', //this will be your queue name and the name of the file that you will create for the worker
		'priority':  1  // 1 - 5 higher number means higher priority
	}
]
```

After adding a queue create a worker file inside ``/src/process`` directory that will run if something registering a queue. The name of the file must be equal to the queue name that you add in ``queue.js``.

***

Credit to
  
body-parser, dotenv, express, express-jwt, express-validator, jsonwebtoken, moment, pg, uuid, winston, winston-daily-rotate-file, chai, mocha, moment, node-schedule, kue, kue-ui-express