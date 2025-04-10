const express = require('express');
const App = express();
const cors = require('cors');

App.use(cors({origin: 'http://localhost:5173', credentials: true}));

App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(cors());

const cursoRoutes = require('./routes/cursoRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');

App.use('/api/curso', cursoRoutes);
App.use('/api/estudiante', estudianteRoutes);
App.use('/api/inscripcion', inscripcionRoutes);

module.exports = App;