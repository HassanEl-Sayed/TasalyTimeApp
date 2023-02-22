const express = require('express');
const adminController = require('../controller/admin');

const router = express.Router();
// ==> post All 
router.post('/addClassification', adminController.postClassification);
router.post('/addCompany', adminController.postCompany);
router.post('/addCountry', adminController.postCountry);
router.post('/addGenre', adminController.postGenre);
router.post('/addRole', adminController.postRole);

// ==> Get All 
router.get('/classification', adminController.getClassification);
router.get('/company', adminController.getCompany);
router.get('/country', adminController.getCountry);
router.get('/Genre', adminController.getGenre);
router.get('/role', adminController.getRole);

module.exports = router