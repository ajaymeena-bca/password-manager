import mongoose from "mongoose";


const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "please enter id"],
    },
    site:{
         type: String,
         required: [true, "please enter site"],
    },
    username:{
         type: String,
         required: [true, "please enter username"]   
    },
    password:{
         type: String,
         require: [true, "please enter password"]
    }
}, {
    timestamps: true,
});


export const Password = mongoose.model('Passwrod', schema);
