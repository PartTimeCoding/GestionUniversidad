'use strict';

const db = require('../config/db');
const User = db.usuarios;
const bcrypt = require('bcrypt');
const service = require('../services/services');
const { Op } = require('sequelize');

async function signUp(req, res) {
    const { usuario, password } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                usuario: usuario
            }
        });

        if (existingUser) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            usuario: usuario,
            password: hashedPassword
        });

        return res.status(201).send({
            message: 'Usuario creado con éxito',
            usuario: newUser.usuario
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Sucedió un error inesperado al crear el usuario'
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
