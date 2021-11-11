import dbConnect from "../../../utils/dbConnect";
import Budget from "../../../models/Budget";

dbConnect();

export default async(req, res) => {
    const { headers: { user }, method } = req;
    switch(method){
        case "GET":
            try {
                const budgetObj = await Budget.find({ user: user })
                res.status(200).json({ success: true, budget: budgetObj })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case "POST":
            const budgetObj = await Budget.create( req.body );
            if(!budgetObj){
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, budget: budgetObj })
            break;
        case "PUT":
            break;
        case "DELETE":
            try {
                const deletedBudgetObj = Budget.deleteOne({ _id : id })
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