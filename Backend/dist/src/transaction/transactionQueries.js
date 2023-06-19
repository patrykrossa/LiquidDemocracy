"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransaction = exports.deleteTransaction = exports.getTransactionById = exports.getTransactions = exports.checkActionTypeExists = exports.addTransaction = void 0;
exports.addTransaction = "INSERT INTO transactions (hash, details, actiontype_id) VALUES ($1,$2,$3) RETURNING *";
exports.checkActionTypeExists = "SELECT * FROM actiontypes WHERE actiontype_id = $1";
exports.getTransactions = "SELECT * FROM transactions INNER JOIN actiontypes on transactions.actiontype_id = actiontypes.actiontype_id";
exports.getTransactionById = "SELECT * FROM transactions INNER JOIN actiontypes on transactions.actiontype_id = actiontypes.actiontype_id WHERE transaction_id = $1 ";
exports.deleteTransaction = "DELETE FROM transactions WHERE transaction_id = $1";
exports.updateTransaction = "UPDATE transactions SET hash = $1, details = $2, actiontype_id = $3 WHERE transaction_id = $4 RETURNING *";
