const express = require('express');
const seriesController = require('../controller/series');
const upload = require('../middleware/upload');

const router = express.Router();
// ==> Post new Series
router.post('/add', seriesController.postSeries);
//==> upload img
router.post('/upload/:id', upload.single('img')  , seriesController.uploadImage);
// ==> Update Series
router.patch('/update/:id', seriesController.updateSeries);
//==> delete Series
router.delete('/remove/:id', seriesController.deleteSeries);
// ==> Geta all Series
router.get('/all', seriesController.getAllSeries);
// ==> Geta one Series
router.get('/:id', seriesController.getSeries);




module.exports = router;