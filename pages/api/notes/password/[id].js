import dbConnect from "../../../../utils/dbConnect";
import NotePassword from "../../../../models/NotePassword";

dbConnect();

export default async (req, res) => {
    const { query: { id }, method } = req;

    switch(method){
        case 'DELETE':
            try {
                const deletedPassword = await NotePassword.deleteOne({ _id: id});
                if(!deletedPassword){
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
        
    }
}