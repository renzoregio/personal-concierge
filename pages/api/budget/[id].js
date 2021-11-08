import dbConnect from "../../../utils/dbConnect";
import Budget from "../../../models/Budget";

dbConnect();

export default async(req, res) => {
    const { query: { id }, method } = req;
    switch(method){
        case "PUT":
            break;
        case "DELETE":
            try {
                const deletedBudgetObj = await Budget.deleteOne({ _id : id })
                if(!deletedBudgetObj){
                    return res.status(400).json({ success: false })
                }
                res.status(400).json({ success: true, data: {}})
            } catch (error) {
                res.status(400).json({ success: true, data: {}})
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}