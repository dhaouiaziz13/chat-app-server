const router=require('express').Router()
const authcontroller=require('../controllers/authcontroller')

router.post('/login',authcontroller.Login)
router.post('/signup',authcontroller.Signup)
router.post('/logout',authcontroller.Logout)
module.exports=router