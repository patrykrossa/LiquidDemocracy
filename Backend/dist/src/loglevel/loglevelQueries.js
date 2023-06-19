"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoglevel = exports.deleteLoglevelById = exports.getLoglevelById = exports.getLoglevels = exports.addLoglevel = void 0;
exports.addLoglevel = "INSERT INTO loglevels (loglevel) VALUES ($1) RETURNING *";
exports.getLoglevels = "SELECT * FROM loglevels";
exports.getLoglevelById = "SELECT * FROM loglevels WHERE loglevel_id = $1";
exports.deleteLoglevelById = "DELETE FROM loglevels WHERE loglevel_id = $1";
exports.updateLoglevel = "Update loglevels SET loglevel = $1 WHERE loglevel_id = $2 RETURNING *";
