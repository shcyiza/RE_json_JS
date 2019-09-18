const moment = require('moment')
const { mapNumbersInBetween, TestFormat, getValidYears, FormatedMoment } = require('./helpers')

const periodTypes = [{name: "year", format: "YYYY"}, {name: "month", format: "MM"}, {name: "day", format: "DD"}]

function PeriodStmnt(str, type) {
    this.str = str
    this.nbr = Number(this.str)
    this.type = type
    this.higherPeriod = periodTypes[periodTypes.indexOf(this.type)-1] || undefined;
    this.peridoEnd = () => {
        if (this.higherPeriod) {
            return Number(
                moment(this.nbr, this.type.name)
                    .endOf(this.higherPeriod.name)
                    .format(this.type.format)
            )
        }
    }
}

function DateStmnt(str, ref= "Date Statement") {
    this.$moment = TestFormat(str, ref)
    this.str = this.$moment.format("YYYYMMDD")
    this.nbr = Number(this.str)
    this.getYear = new PeriodStmnt(this.str.substring(0, 4), periodTypes[0])
    this.getMonth = new PeriodStmnt(this.str.substring(4, 6), periodTypes[1])
    this.getDay = new PeriodStmnt(this.str.substring(6), periodTypes[2])
}

// DoY for Day of year
function DoY(reference_date_stmnt, time_range, occurence_stmnt, separation) {
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
                    `'${last_date}' is an invalid date of format 'YYYYMMDD'. It could be nothing important, if warining happens more then once consider checking the RDDO string input or using the relative API's`,
                    "Day of year resolver"
                )

            }

        }

        return results
    }
}

function DoM(reference_date_stmnt, time_range, occurence_stmnt, separation, attrs) {
    this.valid_years = getValidYears(reference_date_stmnt, time_range, (attrs.length === 2 ? separation : 0))
    this.valid_month = getValidMonths(reference_date_stmnt, time_range, (attrs.length === 1 ? separation : 0))
    this.time_range = time_range
    this.resolveFromHere = function () {
        const {time_range, valid_years} = this
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
                    `'${last_date}' is an invalid date of format 'YYYYMMDD'. It could be nothing important, if warining happens more then once consider checking the RDDO string input or using the relative API's`,
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