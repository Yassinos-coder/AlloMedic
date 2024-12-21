const CallsModel = require("../Schemas/CallsModel")

exports.GetOnGoingCalls = async (req, res) => {
    try {
        const ongoing_calls = await CallsModel.find({ call_status: "ongoing" });
        if (!ongoing_calls) {
            res.status(200).json({
                message: 'FAILED'
            })
        }
        res.status(200).json({
            calls: ongoing_calls,
            message: 'SUCCESS'
        })
        console.log(ongoing_calls)
    } catch (err) {
        console.error(`Error in GetOnGoingCalls API `, err.message)
    }
}
