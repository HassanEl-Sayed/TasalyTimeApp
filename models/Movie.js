const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    name:{
        type: String,
        // required:true,
    },
    duration:{
        type:String,
        // required:true
    },
    year:{
        type:String,
        // required:true
    },
    story:{
        type: String
    },
    language:{
        type:String,
        //required:true
    },
    img:[{ 
        type: Buffer
    }],
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
        }
    }]
})

//to delete objects
moviesSchema.methods.toJSON = function () {
    const movieObject = this.toObject()
    delete movieObject.__v
    return movieObject
}

const Movie = mongoose.model('Movie', moviesSchema)
module.exports = Movie

