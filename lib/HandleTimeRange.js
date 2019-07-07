const { throwFn, warnFn, REday } = require('./utils')

function HandleTimeRange(input_range, tRng) {
    try {
        input_range.sort()
        let start_date = new REday(input_range[0].valueOf(), "argument")
        let end_date = new REday(input_range[1].valueOf(), "argument")
        let saved_start = new REday(tRng.s, "JSON") || ""
        let saved_end = new REday(tRng.e, "JSON") || ""

        if(tRng && tRng.s && saved_start) start_date = start_date.str > saved_start.str ? start_date : saved_start

        if(tRng && tRng.e && saved_end) end_date = end_date.str < saved_end.str ? end_date : saved_end

        if (end_date.str > start_date.str){ 
            return [start_date, end_date]
        } else {
            return []
        }
    } catch(e) {
        throwFn(`invalid or no input time-range given`, "argument")
    }
}

module.exports = HandleTimeRange