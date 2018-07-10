/**
 * Explore cron at https://crontab.guru
 */

module.exports = [
    {
        'cron':'*/5 * * * *', //cron time run every * * * * * * time
        'file':'dummy_process' //the name of the file that will be executed
    },{
        'cron':'*/5 * * * *',
        'file':'dummy_process2'
    }
]