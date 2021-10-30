"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken = require('jsonwebtoken');
var auth = function (req, res, next) {
    try {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, String(process.env.SECRET_KEY), function (err, decodedToken) {
                if (err) {
                    console.log(err.message);
                    res.status(406).send({ message: 'Authorization Token not acceptable' });
                }
                else {
                    res.set('userName', decodedToken.userName);
                    res.set('userEmail', decodedToken.email);
                    res.set('_id', decodedToken.creatorId);
                    next();
                }
            });
        }
        else {
            res.status(403).send({ message: 'Authorization Token is required' });
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
};
module.exports = auth;
