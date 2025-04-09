'use strict';

const db = require('../config/db');
const User = db.usuarios;
const Estudiante = db.estudiantes;  // Referencia al modelo de Estudiante
const bcrypt = require('bcrypt');
const service = require('../services/services');

async function signUp(req, res) {
    const { usuario, password, nombre, apellido, fechaNacimiento, direccion, correoElectronico, telefono, carrera } = req.body;

    if (!usuario || !password || !nombre || !apellido || !fechaNacimiento || !direccion || !correoElectronico || !telefono || !carrera) {
        return res.status(400).send({
            message: 'Todos los campos son obligatorios.'
        });
    }

    try {
        // Primero, crear al estudiante
        const newEstudiante = await Estudiante.create({
            nombreEstudiante: nombre,
            apellidoEstudiante: apellido,
            fecha_nacimiento: fechaNacimiento,
            direccion: direccion,
            correoElectronico: correoElectronico,
            telefono: telefono,
            carrera: carrera
        });

        // Ahora, usar el idEstudiante generado para crear el usuario
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            usuario: usuario,
            password: hashedPassword,
            idEstudiante: newEstudiante.idEstudiante  // Asignamos el idEstudiante del estudiante recién creado
        });

        console.log("Usuario y estudiante creados exitosamente:", newUser.usuario);

        return res.status(201).send({
            message: 'Usuario y estudiante creados con éxito',
            usuario: newUser.usuario
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Sucedió un error inesperado al crear el usuario y estudiante'
        });
    }
}

async function signIn(req, res) {
    const { usuario, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                usuario: usuario
            }
        });

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Contraseña incorrecta' });
        }

        const token = service.createToken(user.idUsuario);

        return res.status(200).send({
            message: 'Inicio de sesión exitoso',
            usuario: user.usuario,
            token
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Sucedió un error inesperado al iniciar sesión'
        });
    }
}

async function getUsers(req, res) {
    try {
        const usuario = await User.findAll();
        return res.status(200).send(usuario);
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Sucedió un error inesperado al obtener los usuarios'
        });
    }
}

module.exports = { signUp, signIn, getUsers };
