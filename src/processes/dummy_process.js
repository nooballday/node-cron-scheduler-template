const model = require('../model/dummy_process_model')

const logError = require('../helper/logger').errorlog

module.exports = (req, res) => {

    /**
     * Add database request here
     */

    (async () => {

        //fetch data from database using each function from the model
        // const { rows } = await model.getUser([
        //     username
        // ])

        /**
         * TODO: do something here
         */


    })().catch(e => setImmediate(() => {
        //define your own logERrorMessage
        logError.error({ 'message': e.message, 'process': require('path').basename(__filename) })
    }))

}