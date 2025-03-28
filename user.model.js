import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    _id : Number,
    Name : {
        type:String,
        require:[true,'Name is requied'],
        trim:true,
        lowercase:true
    },
    Email : {
        type:String,
        require:[true,'Email is requied'],
        unique:true,
        trim:true,
        lowercase:true
    },
    Password : {
        type:String,
        require:[true,'Password is requied'],
        minlength:5,
        maxlength:10,
    },
    Role : String,
    Status : Number,
    Info : String
});
//to apply uniue validator
mongoose.plugin(mongooseUniqueValidator);

const userSchemaModel=mongoose.model('user_collection',userSchema);
export default userSchemaModel;