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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("./personController"));
const personRoutes = (0, express_1.Router)();
personRoutes.post("/", controller.postPerson);
personRoutes.get("/", controller.getPeople);
personRoutes.get("/:id", controller.getPersonById);
personRoutes.delete("/:id", controller.deletePerson);
personRoutes.put("/:id", controller.updatePerson);
exports.default = personRoutes;
/*
POST
{
    "walletAddress": string,
    "name": string,
    "surname": string,
    "birthday": date,
    "livingAddress": string,
    "pesel": string
}

GET
{
    "person_id": int,
    "walletAddress": string,
    "name": string,
    "surname": string,
    "birthday": date,
    "livingAddress": string,
    "pesel": string
}
*/ 
