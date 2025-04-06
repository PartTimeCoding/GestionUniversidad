const express = require('express');
const App = express();
const db = require('./config/db');
const authMiddleware = require('./middlewares/auth');

App.use(express.json());
App.use(express.urlencoded({extended: false}));

const cursoRoutes = require('./routes/cursoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const authRoutes = require('./routes/authRoutes');

db.SequelizeInstance.sync()
    .then(() => console.log("Modelos sincronizados con la base de datos"))
    .catch((err) => console.error("Error al sincronizar modelos:", err));

App.use('/api/', authMiddleware.isAuth, usuarioRoutes);
App.use('/api/auth', authRoutes);
App.use('/api/cursos', cursoRoutes);
App.use('/api/usuarios', usuarioRoutes);
App.use('/api/inscripciones', inscripcionesRoutes);

module.exports = App;