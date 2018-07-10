/**
 * 
 * this file is a dummy file as a Guide to create a process for a queue
 * @param {*} data 
 * @param {*} done 
 */

const emailSender = (job, done) => {
    /**
     * TODO: always call done() every time the queue is finished
     */

    console.log(job)

    done()
}

module.exports = emailSender