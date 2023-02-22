const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    bio:{
        type: String,
    },
    birthDate: {
        type: String
    },
    gender:{
        type: String,
        required: true,
    },
    avgRating:{
        type: Number 
    },
    // img:{},
    roleId:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }]
})

personSchema.virtual('movies', {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'cast.personId'
});

personSchema.virtual('series', {
    ref: 'Series',
    localField: '_id',
    foreignField: 'cast.personId'
});

//to delete objects
personSchema.methods.toJSON = function () {
    const personObject = this.toObject()
    delete personObject.__v
    return personObject
}

const Person =  mongoose.model('Person', personSchema)

module.exports = Person