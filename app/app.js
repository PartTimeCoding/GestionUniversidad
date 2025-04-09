const express = require('express');
const App = express();
const db = require('./config/db');
const authMiddleware = require('./middlewares/auth');
const cors = require('cors');

App.use(cors({origin: 'http://localhost:5173', credentials: true}));

App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(cors());

const cursoRoutes = require('./routes/cursoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const inscripcionesRoutes = require('./routes/inscripcionesRoutes');
const authRoutes = require('./routes/authRoutes');

db.SequelizeInstance.sync()
    .then(() => console.log("Modelos sincronizados con la base de datos"))
    .catch((err) => console.error("Error al sincronizar modelos:", err));

App.use('/api/auth', authRoutes);
App.use('/api/cursos', authMiddleware.isAuth, cursoRoutes);
App.use('/api/usuarios', usuarioRoutes);
App.use('/api/inscripciones', authMiddleware.isAuth, inscripcionesRoutes);

module.exports = App;