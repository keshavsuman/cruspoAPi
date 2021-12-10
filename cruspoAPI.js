"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var goToPageRoutes = require('./Routes/gotopageRoutes');
var paymentRoutes = require('./Routes/paymentRoutes');
var formRoutes = require('./Routes/formRoutes');
var apiRoutes = require('./Routes/API/apiRoutes');
var authenticationRoutes = require('./Routes/authenticationRoutes');
var app = express_1.default();
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '.env')
});
app.use(cors_1.default({
    origin: '*',
    optionsSuccessStatus: 200
}));
mongoose_1.default.connect(String(process.env.DB_URL), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose_1.default.connection.on('error', function (error) {
    console.log(error);
});
mongoose_1.default.connection.on('connected', function () {
    console.log("Database connected");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, './render'));
app.use('/api', apiRoutes);
app.use('/goToPage', goToPageRoutes);
app.use('/form', formRoutes);
app.use('/payment', paymentRoutes);
app.use('/authentication', authenticationRoutes);
app.listen(process.env.PORT, function () {
    console.log("Server is running in port " + process.env.PORT);
});
