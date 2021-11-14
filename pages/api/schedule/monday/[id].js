import dbConnect from "../../../../utils/dbConnect"
import Schedule from "../../../../models/Schedule"

dbConnect();

export default async(req, res) => {
    const { query: { id }, method } = req;

    switch(method){
        case "DELETE":
            try {
                const deletedSchedule = await Schedule.updateOne(
                    {},
                    {$pull: {monday: { _id : id}}},
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