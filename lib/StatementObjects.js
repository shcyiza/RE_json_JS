const moment = require('moment')
const { mapNumbersInBetween, TestFormat, getValidYears, FormatedMoment } = require('./helpers')

const periodTypes = [{name: "year", format: "YYYY"}, {name: "month", format: "MM"}, {name: "day", format: "DD"}]

function PeriodStmnt(str, type) {
    this.str = str
    this.nbr = Number(this.str)
    this.type = type
    this.higherPeriod = function() {
        return periodTypes[periodTypes.indexOf(this.type)-1] || undefined;
    }
    this.mapTill = function(end, cbFn) {
        let higherPeriod = this.higherPeriod()
        let limit
        if (higherPeriod) {
            limit = Number(
                moment(this.nbr, this.type.name)
                    .endOf(higherPeriod.name)
                    .format(this.type.format)
            )
        }
        return mapNumbersInBetween(this.nbr, end, cbFn, limit)
    }
    return this.str
}

function DateStmnt(str, ref= "Date Statement") {
    this.str = TestFormat(str, ref)
    this.nbr = Number(this.str)
    this.getYear = function() {
        return new PeriodStmnt(this.str.substring(0, 4), periodTypes[0])
    }
    this.getMoY = function() {
        return new PeriodStmnt(this.str.substring(4, 6), periodTypes[1])
    }
    this.getDoM = function() {
        return new PeriodStmnt(this.str.substring(6), periodTypes[2])
    }

    return this.str
}

// DoY for Day of year
function DoY(reference_date_stmnt, time_range, occurence_stmnt, separation, attrs) {
    this.filters = occurence_stmnt.get("DoY")
    this.valid_years = getValidYears(reference_date_stmnt, time_range, separation)
    this.time_range = time_range
    this.resolveFromHere = function () {
        const {time_range, valid_years, filters} = this
        const results = []
        const sortedFltrs = filters.sort()
        let last_date = ""

        for (let y = 0; y < valid_years.length; y++) {

            for (let d = 0; d < sortedFltrs.length; d++) {

                last_date = `${valid_years[y]}${filters[d]}`

                if ((last_date) > time_range[1].nbr) {
                    break;
                }

                if (FormatedMoment(last_date) !== "Invalid date") {
                    if (last_date > time_range[0].str) results.push(last_date)
                } else warnFn(
                    `'${last_date}' is an invalide date of formate 'YYYYMMDD'. It could be nothing important, if warining happens more then once consider checking the REjon string or using the relative API's`,
                    "Day of year resolver"
                )

            }

        }

        return results
    }
}

const Statements = {
    DoY
}

module.exports = {DateStmnt, PeriodStmnt, Statements}