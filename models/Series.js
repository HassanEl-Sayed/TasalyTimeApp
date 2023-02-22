const mongoose = require('mongoose')

const seriesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    year:{
        from:{type: Number, required:true},
        to:{type: String}
    },
    story:{
        type: String
    },
    language:{
        type:String,
        required:true
    },
    noOfSeasons:{
        type: Number,
        required:true
    },
    seasonInfo:[{
        noOfSeason:{type: Number, required:true},
        year:{type: Number, required:true},
        episodeInfo:[{
            name:{type: String},
            date:{type:String},
            duration:{type:String}
        }]
    }],
    // img:{ },
    // trailer:{ },
    avgRating:{
        type: Number
    },
    classificationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classification'
    },
    genreId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    companyId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    countryId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }],
    cast:[{
        personId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        },
        roleId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },
        roleName:{
            type: String
        },
        noOfEpisode:{
            type:Number
        }
    }]
})

//to delete objects
seriesSchema.methods.toJSON = function () {
    const seriesObject = this.toObject()
    delete seriesObject.__v
    return seriesObject
}

const Series = mongoose.model('Series', seriesSchema)
module.exports = Series
