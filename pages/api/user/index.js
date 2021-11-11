import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async(req, res) => {
    const { method} = req;
    switch(method){
        case "GET":
            const users = await User.find({})
            if(!users){
                return res.status(400).json({success:false})
            }
            res.status(200).json({ success: true, data: users })
            break;
        case "POST":
            const userObj = await User.create(req.body);
            if(!userObj){
                return res.status(400).json({success:false})
            }
            res.status(200).json({success:true, data: userObj})
            break;
        default: 
            res.status(400).json({success:false})
            break;
    }
}