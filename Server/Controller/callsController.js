const CallsModel = require("../Schemas/CallsModel")

exports.NewCall = async (req, res) => {
    try {
        let newCallData = req.body

        const newCall = new CallsModel(newCallData)
        const isSaved = await newCall.save()
        if (!isSaved) {
            console.log('Error in saving')
            res.status(200).json({ message: 'SOMETHING_WENT_WRONG' })
        }
        res.status(200).json({ call: isSaved, message: 'SUCCESS' })
    } catch (err) {
        console.error(`Error : ${err.message}`)
    }
}