"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken = require('jsonwebtoken');
var auth = function (req, res, next) {
    try {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization.split(' ').pop(), 'helloworld', function (err, decodedToken) {
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
            res.status(403).json({ message: 'Authorization Token is required' });
        }
    }
    catch (e) {
        res.status(500).json({
            status: 500,
            error: e
        });
    }
};
module.exports = auth;
