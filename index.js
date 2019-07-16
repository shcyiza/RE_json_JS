const HandleTimeRange = require('./lib/HandleTimeRange')
const resolversComposer = require('./lib/Resolvers')

const rejson_str = '{"tRng":{"s":"20170101","e":"20210722"},"oStmnt":[["DoY",["1225", "0215"]]], "separation":0}'

function rejson(input_range, rejson) {
    const re_obj = JSON.parse(rejson)
    const time_range = HandleTimeRange(input_range, re_obj.tRng)

    console.log(resolversComposer(time_range, re_obj))
}

rejson(["20180408", "20221230"], rejson_str)