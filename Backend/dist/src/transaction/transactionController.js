"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransaction = exports.deleteTransaction = exports.getTransactionById = exports.getTransactions = exports.postTransaction = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./transactionQueries"));
const postTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hash, details, actionTypeID } = req.body;
        const actionTypeInDatabase = yield db_1.default.query(queries.checkActionTypeExists, [actionTypeID]);
        if (actionTypeInDatabase.rows.length == 0) {
            return res.status(400).json({ message: "Action type does not exist." });
        }
        else {
            const newTransaction = yield db_1.default.query(queries.addTransaction, [hash, details, actionTypeID]);
            return res.status(201).json(newTransaction.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postTransaction = postTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getTransactions, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTransactions = getTransactions;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getTransactionById, [id], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Transaction does not exist. (Non existent id)" });
            }
        }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getTransactionById = getTransactionById;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const log = yield db_1.default.query(queries.getTransactionById, [id]);
        if (!log.rows.length) {
            res.status(400).json({ message: "Transaction does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deleteTransaction, [id], (error, results) => {
                if (error)
                    throw error;
                res.status(200).json({ message: "Successfully deleted." });
            });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.deleteTransaction = deleteTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { hash, details, actionTypeID } = req.body;
        const transaction = yield db_1.default.query(queries.getTransactionById, [id]);
        let actionTypeInDatabase = null;
        if (hash == null)
            hash = transaction.rows[0]["hash"];
        if (actionTypeID == null)
            actionTypeID = transaction.rows[0]["actiontype_id"];
        else
            actionTypeInDatabase = yield db_1.default.query(queries.checkActionTypeExists, [actionTypeID]);
        if (details == null)
            details = transaction.rows[0]["details"];
        if (!transaction.rows.length) {
            res.status(400).json({ message: "Transaction does not exist. (Non existent id)" });
        }
        else if (actionTypeID != transaction.rows[0]["actiontype_id"] && actionTypeInDatabase == null) {
            return res.status(400).json({ message: "Action type does not exist." });
        }
        else {
            const newTransaction = yield db_1.default.query(queries.updateTransaction, [hash, details, actionTypeID, id]);
            res.status(200).json(newTransaction.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updateTransaction = updateTransaction;
