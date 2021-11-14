import dbConnect from "../../../../utils/dbConnect"
import Schedule from "../../../../models/Schedule"

dbConnect();

export default async(req, res) => {
    const { query: { user } ,method} = req;
    const details = user.split("-")
    const username = details[0]
    const day = details[1]
    console.log(username, day)

    switch(method){
        
    }
}