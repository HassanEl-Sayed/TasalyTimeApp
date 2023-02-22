const Series = require('../models/Series');
const fs = require('fs');

//==> Add Series
exports.postSeries = async (req,res)=>{
    const series = new Series(req.body)
    try {
        await series.save()
        res.status(201).json({
            message:"Success"
            ,series
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
}

//==>upload an image 
exports.uploadImage =  async (req , res)=>{
    const img = fs.readFileSync('uploads/' + req.file.filename);
    try {
        const series =  await Series.findById({_id:req.params.id});
        series.img = img;
        await series.save()
        res.status(200).send('successfully uploaded')
    } catch (error) {
        res.status(500).json(err.message)
    }
};

//==> Update Series
exports.updateSeries = async (req,res)=>{
    const updates = Object.keys(req.body)
    try {
        const series = await Series.findById({_id:req.params.id})
        updates.forEach((update)=> series[update] = req.body[update])
        const updateSeries = await series.save()
        res.status(200).json({
            message:"Successfully",
            updateSeries
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}
//==>Delete Series
exports.deleteSeries = async (req,res)=>{
    try {
        await Series.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Series Deleted"
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//==> Get all Series
exports.getAllSeries = async (req, res) => {
    try {
        const series = await Series.find({})
            .populate({ 
                path: 'classificationId genreId companyId countryId',
                select:'name'
            })
            .populate({
                path: 'cast' , populate: {
                    path: 'personId roleId',
                    select: 'name role'
                }})
        const noOfDocuments =await Series.count();
        res.json({
            noOfDocuments,
            series
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}
//==> Get One Series
exports.getSeries = async (req, res) => {
    try {
        const series = await Series.findById({_id:req.params.id})
            .populate({ 
                path: 'classificationId genreId companyId countryId',
                select:'name'
            })
            .populate({
                path: 'cast' , populate: {
                    path: 'personId roleId',
                    select: 'name role'
                }});

        res.json({series})
    } catch (error) {
        res.status(404).send(error.message)
    }
}