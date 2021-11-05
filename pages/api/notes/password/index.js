import dbConnect from "../../../../utils/dbConnect";
import NotePassword from "../../../../models/NotePassword";

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method){
        case 'GET':
            try {
                const password = await NotePassword.find({});
                res.status(200).json({success: true, password: password})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try {
                const password = NotePassword.create(req.body);
                res.status(201).json({success: true, password:password })
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        
    }   
        
} 