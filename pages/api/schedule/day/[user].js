import dbConnect from "../../../../utils/dbConnect"
import Schedule from "../../../../models/Schedule"

dbConnect();

export default async(req, res) => {
    const { query: { user } ,method} = req;
    const details = user.split("-")
    const username = details[0]
    const day = details[1]
    let obj = {}

    if(day === "sunday"){
       obj = {$push: { sunday: { $each: [req.body]}}}
    } else if (day === "monday"){
        obj = {$push: { monday: { $each: [req.body]}}}
    } else if (day === "tuesday"){
        obj = {$push: { tuesday: { $each: [req.body]}}}
    } else if(day === "wednesday"){
        obj = {$push: {wednesday: { $each: [req.body]}}}
    } else if (day === "thursday"){
        obj = {$push: {thursday: {$each: [req.body]}}}
    } else if(day === "friday"){
        obj = {$push: {friday: {$each: [ req.body ]}}}
    } else if (day === "saturday"){
        obj = {$push: {saturday: { $each: [req.body]}}}
    }

    switch(method){
        case "POST":
            try {
                await Schedule.updateOne(
                    { user: username },
                    obj
                )

                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "DELETE":
            try {
                await Schedule.updateOne(
                    { user: user },
                    {$pull: { sunday: { _id : id}}}
                )
                res.status(200).json({success: trues})
            } catch (error) {
                res.status(400).json({ success: false })
            }
        default:
            res.status(400).json({ success: false })
    }
}