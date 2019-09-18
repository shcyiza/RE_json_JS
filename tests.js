const HandleTimeRange = require('./lib/HandleTimeRange')
const {oStmntAttrs, getValidYears, getValidMonths} = require('./lib/helpers')
const {DateStmnt} = require('./lib/StatementObjects')
const assert = require('assert');


describe('Rejson first node implementation', function() {
    
    describe('Handle inputed and saved timerange to have the shortest time frame', () => {
        let inputed = ["20190408", "20191230"]
        let saved = {s:"20190101", e:"20190722"}
        let result = HandleTimeRange(inputed, saved)

        it('should always take the  latest start_date (case1: inputed > saved)', () => {
            assert.strictEqual(result[0].str, "20190408");
        });

        it('should always take the  earliest end_date (case1: inputed > saved)', () => {
            assert.strictEqual(result[1].str, "20190722");
        });

        it('should always take the  latest start_date (case2: inputed < saved)', () => {
            let inputed = ["20190101", "20191230"]
            let saved = {s:"20190408", e:"20190722"}
            let result = HandleTimeRange(inputed, saved)

            assert.strictEqual(result[0].str, "20190408");
        });

        it('should always take the  earliest end_date (case1: inputed < saved)', () => {
            let inputed = ["20190408", "20190722"]
            let saved = {s:"20190101", e:"20191230"}
            let result = HandleTimeRange(inputed, saved)
            
            assert.strictEqual(result[1].str, "20190722");
        });

        it('should handle the lack of saved start_date gracefully', () => {
            let inputed = ["20190408", "20191230"]
            let saved = {e:"20190722"}
            let result = HandleTimeRange(inputed, saved)
            
            assert.strictEqual(result[0].str, "20190408");
            assert.strictEqual(result[1].str, "20190722");
        });

        it('should handle the lack of saved end_date gracefully', () => {
            let inputed = ["20190101", "20191230"]
            let saved = {s:"20180408"}
            let result = HandleTimeRange(inputed, saved)
            
            assert.strictEqual(result[0].str, "20190101");
            assert.strictEqual(result[1].str, "20191230");
        });

        it('should output empty list if inputed and saved time-ranges do not overlap', () => {
            let inputed = ["20190101", "20190722"]
            let saved  = {s:"20180101", e:"20181230"}
            let result = HandleTimeRange(inputed, saved)
            
            assert.deepStrictEqual(result, [])
        });

        it('should throw error if input timerange is not/patially given', () => {
            let inputed = undefined
            let result = () => HandleTimeRange(inputed, saved)
            assert.throws(result, Error);

            inputed = ["20190101"]
            assert.throws(result, Error);
        });
    })

    // const rejson_str = '{"tRng":{"s":"20170101","e":"20210722"},"oStmnt":[["DoY",["1225", "0215"]]], "separation":0}'

    describe('Valid periods helpers test', function() {
        describe('getValidYears helper function', function() {
            let inputed = ["20180408", "20220722"]
            let saved = {s:"20170403"}
            let time_range = HandleTimeRange(inputed, saved)
            let reference_date_stmnt = new DateStmnt(saved.s)

            it('should give consecutive years with no separation.', () => {
                const result = getValidYears(reference_date_stmnt, time_range)
                const expected = [2018, 2019, 2020, 2021, 2022]
                
                assert.deepStrictEqual(result, expected)
            })

            it('should give consecutive years with a separation of 1 year.', () => {
                const result = getValidYears(reference_date_stmnt, time_range, 1)
                const expected = [2019, 2021]
                
                assert.deepStrictEqual(result, expected)
            })

            it('should give consecutive years with a separation of 2 years.', () => {
                inputed = ["20180408", "20270722"]
                time_range = HandleTimeRange(inputed, saved)
                const result = getValidYears(reference_date_stmnt, time_range, 2)
                const expected = [2020, 2023, 2026]
                
                assert.deepStrictEqual(result, expected)
            })
        })

        describe('getValidMonths helper function', function() {
            it('should give consecutive mounth not cyclically with no separation if range in same year.', () => {
                let saved = {s:"20170403"}
                let reference_date_stmnt = new DateStmnt(saved.s)
                let inputed = ["20180408", "20180722"]
                let time_range = HandleTimeRange(inputed, saved)

                const result = getValidMonths(reference_date_stmnt, time_range)
                const expected = [4, 5, 6, 7]
                
                assert.deepStrictEqual(result, expected)
            })

            let saved = {s:"20170403"}
            let reference_date_stmnt = new DateStmnt(saved.s)
            let inputed = ["20180408", "20190722"]
            let time_range = HandleTimeRange(inputed, saved)

            it('should give consecutive mounth cyclically with no separation correctly.', () => {
                const result = getValidMonths(reference_date_stmnt, time_range)
                const expected = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]
                
                assert.deepStrictEqual(result, expected)
            })

            it('should give consecutive mounth cyclically with a separation 1.', () => {
                const result = getValidMonths(reference_date_stmnt, time_range, 1)
                const expected = [4, 6, 8, 10, 12, 2]
                
                assert.deepStrictEqual(result, expected)
            })

            it('should give consecutive mounth cyclically with a separation 2.', () => {
                const result = getValidMonths(reference_date_stmnt, time_range, 2)
                const expected = [4, 7, 10, 1]
                
                assert.deepStrictEqual(result, expected)
            })
        })
    })

})