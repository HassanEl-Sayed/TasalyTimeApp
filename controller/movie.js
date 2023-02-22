const Movie = require('../models/Movie');
const fs = require('fs');
// ==> Add Movie
exports.postMovie = async (req,res)=>{
    const movie = new Movie(req.body)
    
    try {
        await movie.save()
        res.status(201).json({
            message:"Success"
            ,movie
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
};

//==>upload an image 
exports.uploadImage =  async (req , res)=>{
    const img = fs.readFileSync('uploads/' + req.file.filename);
    try {
        const movie =  await Movie.findById({_id:req.params.id});
        movie.img = img;
        await movie.save()
        res.status(200).send('successfully uploaded')
    } catch (error) {
        res.status(500).json(err.message)
    }
};

//==> Update Movie
exports.updateMovie = async (req,res)=>{
    const updates = Object.keys(req.body)
    try {
        const movie = await Movie.findById({_id:req.params.id})
        updates.forEach((update)=> movie[update] = req.body[update])
        const updateMovie = await movie.save()
        res.status(200).json({
            message:"Successfully",
            updateMovie
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}
//==>Delete Movie
exports.deleteMovie = async (req,res)=>{
    try {
        await Movie.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Movie Deleted"
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==> Get all Movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({})
            .populate({ 
                path: 'classificationId genreId companyId countryId',
                select:'name'
            })
            .populate({
                path: 'cast' , populate: {
                    path: 'personId roleId',
                    select: 'name role'
                }})
        const noOfDocuments = await Movie.count();
        res.json({
            noOfDocuments,
            movies
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}
//==> Get One Movie
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById({_id:req.params.id})
            .populate({ 
                path: 'classificationId genreId companyId countryId',
                select:'name'
            })
            .populate({
                path: 'cast' , populate: {
                    path: 'personId roleId',
                    select: 'name role'
                }});
        res.json({movie})
    } catch (error) {
        res.status(404).send(error.message)
    }
};