const express = require('express')
const router = express.Router()

const userSignup = require('../controller/userSignup')
const useSignin = require('../controller/userSignin')
const useProfile = require('../controller/userProfile')
const verifyToken = require('../middleware/verifyToken')
//router
router.post("/signup",userSignup)
router.post("/login",useSignin)
router.post("/user-details",verifyToken,useProfile)

module.exports = router