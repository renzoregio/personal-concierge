import dbConnect from "../../../utils/dbConnect"
import ToDo from "../../../models/ToDo"

dbConnect();

export default async (req, res) => {
    const { headers: { user }, method } = req;
    switch(method){
        case 'GET':
            try {
                const todos = await ToDo.find({ user: user });
                console.log(todos)
                res.status(200).json({ success: true, data: todos});
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const note = await ToDo.create(req.body);
                res.status(201).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success : false })
            break;
    }
}