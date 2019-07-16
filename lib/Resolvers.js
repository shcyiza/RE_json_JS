const { FormatedMoment, warnFn, getValidYears, oStmntAttrs } = require('./utils')

function DoYresolver(time_range, attrFilters, separation = 0) {
    const results = []
    const valid_years = getValidYears(time_range, separation)
    const sortedFltrs = attrFilters.sort()
    let last_date = ""

    for (let y = 0; y < valid_years.length; y++) {
        for (let d = 0; d < sortedFltrs.length; d++) {
            last_date = `${valid_years[y]}${attrFilters[d]}`

            if((last_date) > time_range[1].nbr) { break; }

            if(FormatedMoment(last_date) !== "Invalid date") {
                if (last_date > time_range[0].str) results.push(last_date)
            } else warnFn(
                `'${last_date}' is an invalide date of formate 'YYYYMMDD'. It could be nothing important, if warining happens more then once consider checking the REjon string or using the relative API's`,
                "Day of year resolver"
            )
        }
    }

    return results
}

function resolversComposer(time_range, re_obj) {
    oRslvr.oStmnt = new Map(re_obj.oRslvr.oStmnt)
    const stmnt_attrs = oStmntAttrs(resolver_input.oStmnt)
    console.log(stmnt_attrs)
}

module.exports = resolversComposer