'use strict';

const services = require("../services/services");

function isAuth(req, res, next) {
    console.log('Authorization header:', req.headers.authorization);
    if (!req.headers.authorization) {
        console.log('No authorization header found');
        return res.status(403).send({ message: "No autorizado" });
    }

    const token = req.headers['authorization'].split(' ')[1];
    console.log('Token:', token);

    services.decodeToken(token)
       .then(data => {
            console.log('Decoded token:', data);
            req.user = data;
            next();
        })
       .catch(error => {
            console.log('Error decoding token:', error);
            res.status(500).send({ message: error.message });
        });
}

function whoAmI(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No autorizado" });
    }

    const token = req.headers.authorization.split(' ')[1];

    services.decodeToken(token)
        .then(data => {
            req.user = data;
            next();
        })
        .catch(error => {
            res.status(500).send({ message: error.message });
        });
}

module.exports = { isAuth, whoAmI };
