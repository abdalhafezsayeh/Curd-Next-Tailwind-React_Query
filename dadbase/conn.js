const MONGO_URI = 'mongodb+srv://abdalhafezsayeh1997:pWy0889mgKDthXGq@cluster0.qkinghh.mongodb.net/?retryWrites=true&w=majority'

import mongoose from "mongoose"

const connectMongoose = async () =>{ 
    try {
       const {connction} = await mongoose.connect(MONGO_URI);

       if(connction.readyState == 1) {
        console.log("data connection")
       }


    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectMongoose;