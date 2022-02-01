"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'ap-south-1'
});
exports.multerUpload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: 'cruspothumbnails',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {});
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});
