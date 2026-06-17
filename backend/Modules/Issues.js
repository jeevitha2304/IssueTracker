const mongoose=require('mongoose');
const Issues =new mongoose.Schema({
    title:String,
    description:String,
    createdBy:String,
    priority:{type:String,default:'Low'},
    status: {type: String,default: 'open'},
    due: {type: String},
    createdAt: {type: Date,default: Date.now}
});
module.exports=mongoose.model('Issue',Issues);