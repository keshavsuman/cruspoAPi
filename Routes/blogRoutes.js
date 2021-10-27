"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var blog = express_1.default.Router();
blog.get('/', function (req, res) {
    res.render('admin/blogs');
});
blog.get('/createblog', function (req, res) {
    res.render('admin/create-blog');
});
blog.get('/:blogid', function (req, res) {
});
module.exports = blog;
