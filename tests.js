const HandleTimeRange = require('./lib/HandleTimeRange')
const {REday} = require('./lib/utils')
const assert = require('assert');


describe('Rejson first node implementation', function() {
    
    describe('Handle intputed and saved timerange to have the shortest time frame', () => {
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

    // console.log(new REday("20190403").getYear().mapTill(2026, n => n))
})