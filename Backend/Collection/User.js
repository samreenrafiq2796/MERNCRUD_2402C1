let mongo = require("mongoose")

let User = new mongo.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String
    },
    age : {
        type: Number,
        required: true
    },
    Is_Married : {
        type : Boolean,    
    },
    Record_Added_at :{
        type : Date,
        default : Date.now
    }
})

let export_user = mongo.model("Users", User)

module.exports = export_user