const HandleTimeRange = require('./lib/HandleTimeRange')
const stamentResolver = require('./lib/StatementResolver')


function rejson(input_range, rejson) {
    const re_obj = JSON.parse(rejson)
    const time_range = HandleTimeRange(input_range, re_obj.tRng)
    
    return stamentResolver(time_range, re_obj)
}

module.exports = rejson


const rejson_str = '{"tRng":{"s":"20170101","e":"20210722"},"oStmnt":[["DoY",["1225", "0215"]]], "separation":0}'
console.log(rejson(["20180408", "20221230"], rejson_str))