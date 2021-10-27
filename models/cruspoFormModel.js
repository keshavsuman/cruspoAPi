"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function cruspoForm(prefix) {
    return mongoose_1.model('cruspoForms', new mongoose_1.Schema({}, { strict: false }));
}
exports.default = cruspoForm;
