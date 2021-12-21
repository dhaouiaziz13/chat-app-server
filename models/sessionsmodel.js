const {Schema,model} =require('mongoose')

SessionsSchema=new Schema({
    email:String,
    token:String,
    createdat:{type: Date, default: Date.now}
})

const User=model('sessions',SessionsSchema)
module.exports=User