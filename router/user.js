const express = require('express');
const userAuth = require('../middleware/userAuth');
const upload = require('../middleware/upload');
const userController = require('../controller/user');

const router = express.Router();

//==> get profile of user
router.get('/me', userAuth, userController.getProfile);
//==> upload img
router.post('/upload', upload.single('img') , userAuth , userController.uploadImage);
//==> post update user
router.patch('/update', userAuth, userController.updateUser);
//==> post delete user
router.delete('/remove', userAuth, userController.deleteUser);
//==> get All Users
router.get('/all',  userController.getUsers);
//==> get one user
router.get('/:id',  userController.getUser);
//==> Add rateing
router.post('/rate',  userAuth, userController.postRating);



module.exports = router