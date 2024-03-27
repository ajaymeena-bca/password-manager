import mongoose from "mongoose";


export class ErrorHandler extends Error{
      
    constructor(message, statusCode){
          super(message);
          this.statusCode = statusCode;
    }
};

export const connectDb = (uri) => {
    mongoose.connect(uri, {
        dbName: "passwordManager",
    }).then((c) => {
        console.log(`db connect to : ${c.connection.host}`);
    }).catch((err) => {
        console.log("error ajay is : " + err);
    });
};
