const Person = require('../models/Person');

//==> Add Person
exports.postPerson = async (req,res)=>{
    const newPerson = new Person(req.body)
    try {
        await newPerson.save()
        res.status(201).json(newPerson)
    } catch (e) {
        res.status(400).json(e.message)
    }
};

//==> Update Person
exports.updatePerson = async (req,res)=>{
    const updates = Object.keys(req.body)
    try {
        const person = await Person.findById({_id:req.params.id})
        updates.forEach((update)=> person[update] = req.body[update])
        const updatePerson = await person.save()
        res.status(200).json({
            message:"Successfully",
            updatePerson
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==>Delete Person
exports.deletePerson = async (req,res)=>{
    try {
        await Person.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Person Deleted"
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};


//==> Get All Persons
exports.getAllPerson =  async (req, res) => {
    try {
        const persons = await Person.find({}).populate({ path: 'roleId' , select:'role'})
        const noOfDocuments = await Person.count();
        res.status(200).json({
            noOfDocuments,
            persons
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==> Get One Person
exports.getPerson = async (req,res)=>{
    try {
        const person = await Person.findById({_id:req.params.id}).populate({ path: 'roleId' , select:'role'})
        res.status(200).json(person)
    } catch (error) {
        res.status(400).json(error.message)
    }
};

//==> Get All movies for one person
exports.getMoviesForPerson = async (req,res)=>{
    try {
        const allMovies = await Person.findById({_id: req.params.id}).populate({path:'movies'});

        const movies = allMovies.movies.map(movie=>{
            return{
                _id:movie._id,
                name :movie.name,
                duration: movie.duration,
                year : movie.year,
                classificationId : movie.classificationId
            };
        });

        res.status(200).send(movies)
    } catch (error) {
        res.status(500).send(error)
    }
};

//==> Get All Series for one person
exports.getSeriesForPerson = async (req,res)=>{
    try {
        const allSeries = await Person.findById({_id: req.params.id}).populate({path:'series'});
        const series = allSeries.series.map(series=>{
            return{
                _id:series._id,
                name :series.name,
                year : {from:series.year.from , to:series.year.to},
                noOfSeasons: series.noOfSeasons,
                classificationId:series.classificationId
            };
        });
        res.status(200).send(series)
    } catch (error) {
        res.status(500).send(error)
    }
};



