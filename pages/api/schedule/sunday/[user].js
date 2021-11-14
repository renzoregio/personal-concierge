import dbConnect from "../../../../utils/dbConnect"
import Schedule from "../../../../models/Schedule"

dbConnect();



export default async(req, res) => {
    const { query: { user }, method } = req;
    
    switch(method){
        case "POST":
            try {
                await Schedule.updateOne(
                    {user: user},
                    {$push: {
                        sunday: {
                            $each: [req.body]
                        }
                    }}
                )
                res.status(200).json({ success: true})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
    }
}