import dbConnect from "../../../utils/dbConnect"
import ToDo from "../../../models/ToDo"

dbConnect();

export default async (req, res) => {
    const { query: { id }, method } = req;

    switch(method){
        case 'PUT':
            try {
                const toDo = await ToDo.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!toDo){
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success:true, data: toDo})
            } catch (error) {
                res.status(400).json({success:false})
            }
            break;
        case 'DELETE':
            try {
                const deletedToDo = await ToDo.deleteOne({ _id: id });
                if(!deletedToDo){
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success:true, data: {}})
            } catch (error) {
                res.status(400).status({success:false})
            }
            break;
        default:
            res.status(400).json({success:false})
            break;
    }
}