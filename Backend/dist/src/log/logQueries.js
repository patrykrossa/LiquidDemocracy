"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLog = exports.deleteLog = exports.getLogById = exports.getLogs = exports.checkLoglevelExists = exports.addLog = void 0;
exports.addLog = "INSERT INTO logs (description, loglevel_id, date) VALUES ($1,$2,$3) RETURNING *";
exports.checkLoglevelExists = "SELECT * FROM loglevels WHERE loglevel_id = $1";
exports.getLogs = "SELECT * FROM logs INNER JOIN loglevels on logs.loglevel_id = loglevels.loglevel_id";
exports.getLogById = "SELECT * FROM logs INNER JOIN loglevels on logs.loglevel_id = loglevels.loglevel_id WHERE log_id = $1 ";
exports.deleteLog = "DELETE FROM logs WHERE log_id = $1";
exports.updateLog = "UPDATE logs SET description = $1, loglevel_id = $2, date = $3 WHERE log_id = $4 RETURNING *";
