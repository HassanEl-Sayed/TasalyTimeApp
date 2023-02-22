const Classification = require('../models/Classification');
const Company = require('../models/Company');
const Genre = require('../models/Genre');
const Country = require('../models/Country');
const Role = require('../models/Role');

// ==> Post All
exports.postClassification = async (req,res)=>{
    const classification = new Classification(req.body)
    try {
        await classification.save()
        res.status(201).json({
            message:"Success"
            ,classification
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
}
exports.postCompany = async (req,res)=>{
    const company = new Company(req.body)
    try {
        await company.save()
        res.status(201).json({
            message:"Success"
            ,company
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
}
exports.postGenre = async (req,res)=>{
    const genre = new Genre(req.body)
    try {
        await genre.save()
        res.status(201).json({
            message:"Success"
            ,genre
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
}
exports.postCountry = async (req,res)=>{
    const country = new Country(req.body)
    try {
        await country.save()
        res.status(201).json({
            message:"Success",
            country
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
}
exports.postRole = async (req,res)=>{
    const role = new Role(req.body)
    try {
        await role.save()
        res.status(201).json({
            message:"Success",
            role
        })
    } catch (e) {
        res.status(400).json(e.message)
    }
}

// ==> Get All
exports.getClassification = async (req, res) => {
    try {
        const classification = await Classification.find();
        const count =await Classification.count();
        res.json({
            count,
            classification
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}
exports.getCompany = async (req, res) => {
    try {
        const company = await Company.find();
        const count =await Company.count();
        res.json({
            count,
            company
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}
exports.getCountry = async (req, res) => {
    try {
        const country = await Country.find();
        const count =await Country.count();
        res.json({
            count,
            country
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}
exports.getGenre = async (req, res) => {
    try {
        const genre = await Genre.find();
        const count =await Genre.count();
        res.json({
            count,
            genre
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}
exports.getRole = async (req, res) => {
    try {
        const role = await Role.find();
        const count =await Role.count();
        res.json({
            count,
            role
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}