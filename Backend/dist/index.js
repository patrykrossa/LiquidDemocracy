"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personRoutes_1 = __importDefault(require("./src/person/personRoutes"));
const loglevelRoutes_1 = __importDefault(require("./src/loglevel/loglevelRoutes"));
const actionTypeRoutes_1 = __importDefault(require("./src/actionTypes/actionTypeRoutes"));
const logRoutes_1 = __importDefault(require("./src/log/logRoutes"));
const transactionRoutes_1 = __importDefault(require("./src/transaction/transactionRoutes"));
var cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use('/api/people', personRoutes_1.default);
app.use('/api/loglevels', loglevelRoutes_1.default);
app.use('/api/actionTypes', actionTypeRoutes_1.default);
app.use('/api/logs', logRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
