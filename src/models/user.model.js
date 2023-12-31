

import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
},{
    timestamps: true,
    versionKey: false,

});


const UserModel = model("User", userSchema);

export default UserModel;
