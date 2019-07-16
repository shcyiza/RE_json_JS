function REperiod(str, type) {
    this.str = str
    this.nbr = Number(this.str)
    this.type = type
    this.higherPeriod = function() {
        return periodTypes[periodTypes.indexOf(this.type)-1] || undefined;
    }
    this.mapTill = function(end, cbFn) {
        let higherPeriod = this.higherPeriod()
        let limit = undefined
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

function StmtData(str, ref= "Reccuring Event Object") {
    this.str = TestFormat(str, ref)
    this.nbr = Number(this.str)
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

module.exports = {DateStmnt: DateStmnt}