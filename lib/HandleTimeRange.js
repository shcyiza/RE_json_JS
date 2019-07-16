const { throwFn } = require('./helpers')
const { DateStmnt } = require('./StatementObjects')

function HandleTimeRange(input_range, tRng) {
    try {
        input_range.sort()
        let start_date = new DateStmnt(input_range[0].valueOf(), "argument start date")
        let end_date = new DateStmnt(input_range[1].valueOf(), "argument end date")
        let saved_start = new DateStmnt(tRng.s, "Re-JSON start date") || ""
        let saved_end = new DateStmnt(tRng.e, "Re-JSON end date") || ""

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