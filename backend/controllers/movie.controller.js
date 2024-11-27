const Movie = require('../models/movie.model');
const movieCtrl = {};

//Función que devuelve todas las películas
movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find().then((data) => res.status(200).json(data)).catch((err)=> res.status(400).send(err));
    
}

//Funcion que devuelve una pelicula dado un id
movieCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id).then((data) =>
    {
        if(data!=null) res.status(200).json({status:data})
            else res.status(404).json({status: 'Movie not found'})
    }).catch((err)=> res.status(400).json({status: err}));
    
}

//crear una peli
movieCtrl.addMovie = async (req, res) => {
    const movie= new Movie(req.body);
    await movie.save().then((data) => res.status(201).json({status:'Movie succesfully inserted'}) 
    ).catch((err)=> res.status(400).json({status: err}));
}

// put una peli
movieCtrl.updateMovie = async (req, res) => {
    const movie= req.body;
    await Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movie},
        {new: true})
    .then((data) => {
        if(data)res.status(200).json({status: 'Movie succesfully inserted'})
    else res.status(404).json({status: 'Movie not found'})})
    .catch((err)=> res.status(400).json({status: err}));
}

movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
    .then((data) => {
        if(data)res.status(200).json({status: 'Movie succesfully deleted'})
    else res.status(404).json({status: 'Movie not found'})})
    .catch((err)=> res.status(400).json({status: err}));
}


movieCtrl.getGenres = async (req, res) => {
    await Movie.find().distinct('genres')
    .then((data) => {
       res.status(200).json({status: data})})
    .catch((err)=> res.status(400).json({status: err}));
};

module.exports = movieCtrl;
