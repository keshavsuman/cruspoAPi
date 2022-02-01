"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var uuid_1 = __importDefault(require("uuid"));
var express_1 = require("express");
var axios_1 = __importDefault(require("axios"));
// jsonwebtoken.sign(
//     {
//         access_key: app_access_key,
//         type: 'management',
//         version: 2,
//         iat: Math.floor(Date.now() / 1000),
//         nbf: Math.floor(Date.now() / 1000)
//     },
//     app_secret,
//     {
//         algorithm: 'HS256',
//         expiresIn: '24h',
//         jwtid: uuid.v4()
//     },
//     function (err, token) {
//         console.log(token);
//     }
// );
var meetRoutes = (0, express_1.Router)();
meetRoutes.post('/createRoom', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roomOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                roomOptions = {
                    roomName: req.body.roomName,
                    roomDescription: req.body.roomDescription
                };
                return [4 /*yield*/, createRoom(roomOptions)];
            case 1:
                _a.sent();
                console.log(express_1.response);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
meetRoutes.post('/getToken', function (req, res) {
    try {
        // console.log(req.body);
        var payload = {
            access_key: process.env.app_access_key,
            room_id: req.body.room_id,
            user_id: req.body.user_id,
            role: req.body.role,
            type: 'app',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        };
        var token = jsonwebtoken_1.default.sign(payload, String(process.env.app_secret), {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: uuid_1.default.v4()
        });
        res.send({ token: token });
    }
    catch (error) {
        console.log(error);
    }
});
function createRoom(roomOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var authToken, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    authToken = jsonwebtoken_1.default.sign({
                        access_key: process.env.app_access_key,
                        type: 'management',
                        version: 2,
                        iat: Math.floor(Date.now() / 1000),
                        nbf: Math.floor(Date.now() / 1000)
                    }, String(process.env.app_secret), {
                        algorithm: 'HS256',
                        expiresIn: '24h',
                        jwtid: uuid_1.default.v4()
                    });
                    console.log(authToken);
                    return [4 /*yield*/, axios_1.default.post(process.env.HMS_PROD_URL + '/rooms', {
                            "name": roomOptions.roomName,
                            "description": roomOptions.roomDescription,
                            "recording_info": {
                                "enabled": true,
                                "upload_info": {
                                    "type": "s3",
                                    "location": "test-bucket",
                                    "prefix": "test-prefix",
                                    "options": {
                                        "region": "ap-south-1"
                                    },
                                    "credentials": {
                                        "key": process.env.AWSAccessKeyId,
                                        "secret": process.env.AWSSecretKey
                                    }
                                }
                            }
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + authToken,
                                'Content-type': 'application/json'
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createRoom = createRoom;
module.exports = meetRoutes;
