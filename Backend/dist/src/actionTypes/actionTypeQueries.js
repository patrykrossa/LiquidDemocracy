"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActionType = exports.deleteActionTypeById = exports.getActionTypeById = exports.getActionTypes = exports.addActionType = void 0;
exports.addActionType = "INSERT INTO actiontypes (actiontype) VALUES ($1) RETURNING *";
exports.getActionTypes = "SELECT * FROM actiontypes";
exports.getActionTypeById = "SELECT * FROM actiontypes WHERE actiontype_id = $1";
exports.deleteActionTypeById = "DELETE FROM actionTypes WHERE actiontype_id = $1";
exports.updateActionType = "UPDATE actionTypes SET actiontype = $1 WHERE actiontype_id = $2 RETURNING *";
