import dbConnect from "../../../../utils/dbConnect"
import Schedule from "../../../../models/Schedule"

dbConnect();

export default async(req, res) => {
    const { query: { id }, method } = req;
    let obj = {};
    const arr = id.split("-")
    const taskId = arr[0];
    const user = arr[1]
    const day = arr[2]
    
    if(day === "sunday"){
        obj = {$pull: {sunday: { _id : taskId}}}
    } else if(day === "monday"){
        obj = {$pull: {monday: { _id : taskId}}}
    } else if(day === "tuesday"){
        obj = {$pull: {tuesday: { _id : taskId}}}
    } else if(day === "wednesday"){
        obj = {$pull: {wednesday: { _id : taskId}}}
    } else if (day === "thursday"){
        obj = {$pull: {thursday: { _id : taskId}}}
    } else if (day === "friday"){
        obj = {$pull: {friday: { _id : taskId }}}
    } else if (day === "saturday"){
        obj = {$pull: { saturday : { _id : taskId }}}
    }

    switch(method){
        case "DELETE":
            try {
                const deletedSchedule = await Schedule.updateOne(
                    { user: user},
                    obj,
                    {multi: true}
                )
                if(!deletedSchedule){
                    return res.status(400).json({ success: false})
                }
                res.status(200).json({ success: true, data: deletedSchedule})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}