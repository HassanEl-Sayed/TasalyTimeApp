const express = require('express');
const personController = require('../controller/person');
const upload = require('../middleware/upload');

const router = express.Router();
//==> Add person
router.post('/add', personController.postPerson);
//==> upload img
router.post('/upload/:id', upload.single('img')  , personController.uploadImage);
//==> Update Person
router.patch('/update/:id', personController.updatePerson);
//==> delete person
router.delete('/remove/:id', personController.deletePerson);
//==> Get all Person
router.get('/all', personController.getAllPerson);
//==> get one Person
router.get('/:id', personController.getPerson);
//==> Get All movies for one person
//==> id = id of person
router.get('/allMovies/:id', personController.getMoviesForPerson);
//==> Get All series for one person
router.get('/allSeries/:id', personController.getSeriesForPerson);



module.exports = router