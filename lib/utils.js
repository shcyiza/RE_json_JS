const moment = require('moment')

const FormatedMoment = str => moment(str, "YYYYMMDD").format("YYYYMMDD")

const periodTypes = [{name: "year", f: "YYYY"}, {name: "month", f: "MM"}, {name: "day", f: "DD"}]

function REday(str, ref= "Reccuring Event Object") {
    this.str = TestFormat(str, ref)
    this.n = Number(this.str)
    this.getYear = function() {
        return new REperiod(this.str.substring(0, 4), periodTypes[0])
    }
    this.getMoY = function() {
        return new REperiod(this.str.substring(4, 6), periodTypes[1])
    }
    this.getDoM = function() {
        return new REperiod(this.str.substring(6), periodTypes[2])   
    }

    return this.str
}

function REperiod(str, type) {
    this.str = str
    this.n = Number(this.str)
    this.type = type
    this.hPeriod = function() {
        return periodTypes[periodTypes.indexOf(this.type)-1] || undefined;
    }
    this.mapTill = function(end, cbFn) {
        let hPeriod = this.hPeriod()
        let limit = undefined
        if (hPeriod) {
            limit = Number(
                moment(this.n, this.type.name)
                .endOf(hPeriod.name)
                .format(this.type.f)
            )
        }
        return mapNumbersInBetween(this.n, end, cbFn, limit)
    }
    return this.str
}

function mapNumbersInBetween(start, end, cbFn, limit = Infinity) {
    const result = []
    // console.log("limit", limit)
    for (let i = 0; (i < ((end+1)) - start) && (i < ((limit+1) - start)); i++) { 
        result[i] = cbFn(i + start)
    }
    return result
}

function numbersInbetween(start, end) {
    const result = []
    for (let i = 0; i < ((end+1) - start); i++) { 
        result[i] = i + start
    }
    return result
}

const warnFn = (error, ref) => {
    console.warn(`REjson moderate error invalid ${ref} given:  ${error}`)
}

const throwFn = (error, ref) => {
    throw(Error(`REjson fatale error invalid ${ref} given:  ${error}`))
}

function TestFormat(str, ref) {
    const checked_moment = FormatedMoment(str)
    const regex_result = (/^(\d{4})((0|1)\d{1})((0|1|2|3)\d{1})/g).test(str)

    if (regex_result) {
        return checked_moment !== "Invalid date" ? checked_moment : warnFn(`'${str}' is not an valid date`, ref)
    } else {
        warnFn(`'${str}'Format for date strings must be 'YYYYMMDD'`, ref)
    }
}

module.exports = {FormatedMoment, TestFormat, warnFn, throwFn, REday}