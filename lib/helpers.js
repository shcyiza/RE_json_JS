const moment = require('moment')

const warnFn = (error, ref) => {
    console.warn(`REjson moderate error at ${ref}:  ${error}`)
}

const throwFn = (error, ref) => {
    throw(Error(`REjson fatale error invalid ${ref} given:  ${error}`))
}

function TestFormat(str, ref) {
    const regex_result = (/^(\d{4})((0|1)\d{1})((0|1|2|3)\d{1})/g).test(str)

    if (regex_result) {
        let checked_moment = FormatedMoment(str)
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

const separationCallback = (n, i, separation) => {
    if (separation > -1) {
        if((i + separation+1)%(separation+1) === 0 || separation === 0) return n
    } else {
        throwFn("REjson separation property cannot a number lower than 0", "REjson String")
    }
}

function getValidYears(startDateStmnt, time_range, separation=0) {
    return startDateStmnt.getYear().mapTill(
        time_range[1].getYear().nbr,
        (n, i) => separationCallback(n, i, separation)
    ).filter(y => y >= time_range[0].getYear().nbr)
}



// oStmnt is a Map object
const oStmntAttrs = oStmnt => [...oStmnt.keys()].reverse()


module.exports = {
    FormatedMoment,
    TestFormat,
    warnFn,
    throwFn,
    mapNumbersInBetween,
    oStmntAttrs,
    getValidYears
}