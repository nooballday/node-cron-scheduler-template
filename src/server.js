'use strict'

require('dotenv').config(); //load enviroment variable

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('express-jwt');
const formdataParser = require('multer')().fields([]) // allow form data and multipart to go through API

const kueUIExpress = require('kue-ui-express')

const logInfo = require('./helper/logger').infolog
const errLog = require('./helper/logger').errorlog

const Jobs = require('./jobs')
const Queues = require('./queue')

const Schedule = require('node-schedule')

const port = process.env.SERVERPORT;

const kue = require('kue'),
    Qu = kue.createQueue();

app.use(bodyParser.json())
app.use(formdataParser) //use as middleware in service 
app.use(bodyParser.urlencoded({
    extended: true
}))

kueUIExpress(app, '/kue/', '/kue-api/')

app.use('/kue-api/', kue.app)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            "message": "Missing Authorization"
        });
    }
})

Queues.forEach(queue => {
    Qu.process(queue.name, 1, (job, done) => {
        require(`./queues/${queue.name}`)(JSON.parse(job.data.payload), done)
    })
})


/**
 * run array cron jobs
 */

Jobs.forEach(job => {
    Schedule.scheduleJob(job.cron, () => {
        require(`./processes/${job.file}`)();
    })
});

/**
 * run process based on file
 */
app.get('/run/:process', (req, res) => {
    require(`./processes/${req.params.process}`)()
    res.send({
        status: true
    })
})

/**
 * registering to a queue
 */
app.post('/queue', (req, res) => {
    const data = req.body

    const filename = data.filename //this will be the name of the queue and the filename that's going to be executed
    const payload = data.payload  //this is payload that will be sent to worker

    Qu.create(filename, {
        /**
         * NOTE: data to send to worker
         */
        payload
    }).save((err) => {
        if (err) {
            errLog.error({ 'time': new Date(), 'err': err, 'filename': __filename.split(/[\\/]/).pop() })
            // raven.captureException(err) // TODO: activate it later in production
        }
    });

    res.send({
        status: true
    })
})

app.listen(
    port,
    () => {
        logInfo.info("Server Running At " + new Date())
        console.log("App Running at Port : " + port);
    }
)