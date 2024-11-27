const express=require('express');
const morgan = require('morgan'); // peticiones a la api
const cors = require('cors');
const app = express();
const {mongoose}= require('./database');
const {json} = require('express');

//middleware funciones intermedias de la api
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


//routwa
app.use('/api/v1/movies', require('./routes/movie.route'));
app.use('/', (req, res) => res.send('API is in /api/v1/movies'));

//settings
app.set('port', process.env.PORT || 3000);

//Iniciar el server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
})