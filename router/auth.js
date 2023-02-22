const express = require('express');
const authController = require('../controller/auth');
const userAuth = require('../middleware/userAuth');
const upload = require('../middleware/upload');

const router = express.Router();

// ==> Post new User
router.post('/signup',  upload.single('img') , authController.postSignup);
//==> post login user
router.post('/login', authController.postLogin);
//==> post logout user
router.post('/logout', userAuth ,authController.PostLogout);

module.exports = router





