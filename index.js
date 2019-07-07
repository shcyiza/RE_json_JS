const HandleTimeRange = require('./lib/HandleTimeRange')

function rejson(input_range, stmnt) {
    const reObj = JSON.parse(stmnt)
    const time_range = HandleTimeRange(input_range, reObj.tRng)

    console.log(time_range)
}

module.exports = rejson