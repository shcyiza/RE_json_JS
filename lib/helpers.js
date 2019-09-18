const moment = require('moment')

const warnFn = (error, ref) => {
    console.warn(`RDDO moderate error at ${ref}:  ${error}`)
}

const throwFn = (error, ref) => {
    throw(Error(`RDDO fatale error invalid at given ${ref}:  ${error}`))
}

function TestFormatAndReturnMoment(str, ref) {
    const regex_result = (/^(\d{4})((0|1)\d{1})((0|1|2|3)\d{1})/g).test(str)

    if (regex_result) {
        let checked_moment = moment(str, "YYYYMMDD")
        return checked_moment !== "Invalid date" ? checked_moment : warnFn(`'${str}' is not an valid date`, ref)
    } else if(str) {
        warnFn(`'${str}'Format for date strings must be 'YYYYMMDD'`, ref)
    }
}

const FormatedMoment = str => moment(str, "YYYYMMDD").format("YYYYMMDD")

function mapNumbersInBetween(start, end, cbFn = n=>n , limit = Infinity) {
    const result = []
    let item
    // console.log("limit", limit)
    for (let i = 0; (i < ((end+1)) - start) && (i < ((limit+1) - start)); i++) { 
        item = cbFn(i + start, i)
        if (item) result.push(item)
    }
    return result
}

function separationCallback(current_number, ref, separation){
    if (separation === 0) return current_number

    if (separation > 0) {
        const seperationTerm = (
            current_number - ref < -1 
                ? 
            current_number - ref
                :
            ref - current_number
        ) % (separation+1) === 0;

        if (seperationTerm) return current_number
    } else {
        throwFn("separation property must be a number lower than 0", "RDDO sting input")
    }
}

function cycleCallback(current_number, period_end, ref, separation) {
    const current_cycle_result = current_number > period_end ? current_number - period_end : current_number

    return separationCallback(current_cycle_result, ref, separation)
}



function getValidYears(ref_date, time_range, separation=0) {
    const ref_year = ref_date.getYear.nbr

    return mapNumbersInBetween(
        time_range[0].getYear.nbr,
        time_range[1].getYear.nbr,
        (n) => separationCallback(n, ref_year, separation)
    )
}

function getValidMonths(ref_date, time_range, separation=0) {
    const ref_month = ref_date.getMonth.nbr
    const distance = time_range[1].$moment.diff(time_range[0].$moment, 'month')

    return mapNumbersInBetween(
        time_range[0].getMonth.nbr,
        11 < distance ? distance : time_range[1].getMonth.nbr,
        (n) => cycleCallback(n, time_range[0].getMonth.peridoEnd(),ref_month, separation),
    )

}



// oStmnt is a Map object
const oStmntAttrs = oStmnt => [...oStmnt.keys()].reverse()


module.exports = {
    FormatedMoment,
    TestFormat: TestFormatAndReturnMoment,
    warnFn,
    throwFn,
    mapNumbersInBetween,
    oStmntAttrs,
    getValidYears,
    getValidMonths
}