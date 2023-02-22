const User = require('../models/User');
const Rating = require('../models/Rating');
const fs = require('fs');


//==>upload an image 
exports.uploadImage =  async (req , res)=>{
    const img = fs.readFileSync('uploads/' + req.file.filename);
    try {
        req.user.img = img
        await req.user.save()
        res.status(200).send('successfully uploaded')
    } catch (error) {
        res.status(500).json(err.message)
    }
};

//==> Profile user
exports.getProfile = async (req,res)=>{
    const {__v ,tokens,img, ...info} = req.user._doc;
    res.json(info)
};


//==> Update profile of user
exports.updateUser = async (req,res)=>{
    const updates = Object.keys(req.body)
    try {
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).json(req.user)
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==>Delete Account
exports.deleteUser = async (req,res)=>{
    try {
        await req.user.remove()
        res.status(200).json({
            message:"Account Deleted"
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==> All users
exports.getUsers = async (req,res)=>{
    const query = req.query.new;
    try {
        const users = query
        ? await User.find({}).limit(3).sort({id:-1})
        : await User.find({})

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==> One user
exports.getUser = async (req,res)=>{
    try {
        const user = await User.findById({_id:req.params.id});
        const {password , ...info} = user._doc;
        res.status(200).json(info)
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==> rate a movies
exports.postRating = async (req, res) => {
    const rate = new Rating({
        comment: req.body.comment,
        ratingValue:req.body.ratingValue,
        moviesId:req.body.moviesId,
        seriesId:req.body.seriesId,
        userId: req.user._id  //store id of user auto that user when login
    });

    try {
        await rate.save()
        res.status(201).send(rate)
    } catch (e) {
        res.status(400).send(e.message)
    }
};







