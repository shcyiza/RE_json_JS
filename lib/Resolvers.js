const { FormatedMoment, warnFn, getValidYears, oStmntAttrs, lastCharacterOfSting } = require('./utils')
const {DateStmnt, Statements} = require('./StatementObjects')

const available_apis = ["DoY", "DoM", "RDoM", "DoW", "RDoW", "D"]


function resolversComposer(time_range, re_obj) {
    re_obj.oStmnt = new Map(re_obj.oStmnt)
    const {tRng, oStmnt, separation, omit} = re_obj

    const reference_date_stmnt = new DateStmnt(tRng.s)
    const attrs = oStmntAttrs(oStmnt)

    return new Statements[attrs[0]](reference_date_stmnt, time_range, oStmnt, separation, attrs).resolveFromHere()
}

module.exports = resolversComposer