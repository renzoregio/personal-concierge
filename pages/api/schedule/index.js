import dbConnect from "../../../utils/dbConnect"
import Schedule from "../../../models/Schedule"

dbConnect();


export default async(req, res) => {
    const { headers: { user }, method } = req;

    switch(method){
        case "GET":
            try {
                const data = await Schedule.find({ user: user })
                res.status(200).json({ success: true, data: data})
            res.status()
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "POST":
            try {
                const data = await Schedule.create(req.body)
                res.status(200).json({ success: true, data: data })
            } catch (error) {
                res.status(400).json({ success: false})
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}