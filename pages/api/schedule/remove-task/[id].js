import dbConnect from "../../../../utils/dbConnect"
import Schedule from "../../../../models/Schedule"

dbConnect();

export default async(req, res) => {
    const { query: { id }, method } = req;
    
    switch(method){
        case "DELETE":
            try {
                console.log(id)
                const arr = id.split("-")
                const taskId = arr[0];
                const user = arr[1]
                const day = arr[2]
                const deletedSchedule = await Schedule.updateOne(
                    { user: user},
                    {$pull: {sunday: { _id : taskId}}},
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