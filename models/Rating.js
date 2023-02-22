const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    comment:{
        type: String,
    },
    ratingValue:{
        type: Number,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seriesId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series'
    },
    moviesId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies'
    }
});

ratingSchema.statics.getAvgRatingForMovie = async function(movie ,series){
    const avg = await this.aggregate([
        {
            $match:{moviesId:movie },
            $match:{seriesId:series}
        },
        {
            $group:{
                _id:'$moviesId || seriesId',
                avgRating:{ $avg:'$ratingValue'}
            }
        }
    ]);

    try {
            await this.model('Movie').findByIdAndUpdate(movie,{
                avgRating : avg[0].avgRating
            });
            await this.model('Series').findByIdAndUpdate(series,{
                avgRating : avg[0].avgRating
            });
        
    } catch (err) {
        console.error(err)
    }
};

ratingSchema.post('save', function(){
    this.constructor.getAvgRatingForMovie(this.moviesId , this.seriesId);
});


const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating
