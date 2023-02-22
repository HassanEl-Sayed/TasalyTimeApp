const mongoose = require('mongoose')

const classificationSchema = new mongoose.Schema({
    type:{
        type: String,
        required:true,
        lowercase:true
    }
})


const Classification = mongoose.model('Classification', classificationSchema)
module.exports = Classification
