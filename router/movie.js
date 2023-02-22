const express = require('express');
const movieController = require('../controller/movie');
const upload = require('../middleware/upload');

const router = express.Router();
// ==> Post new Movie
router.post('/add', movieController.postMovie);
//==> upload img
router.post('/upload/:id', upload.single('img')  , movieController.uploadImage);
// ==> Update Movie
router.patch('/update/:id', movieController.updateMovie);
//==> delete person
router.delete('/remove/:id', movieController.deleteMovie);
// ==> Geta all Movies
router.get('/all', movieController.getAllMovies);
// ==> Geta one Movie
router.get('/:id', movieController.getMovie);




module.exports = router;