const {Schema,model} =require('mongoose')

UserSchema=new Schema({
    username:String,
    email:String,
    password:String,
    createdat:{type: Date, default: Date.now}
})

const Session=model('users',UserSchema)
module.exports=Session