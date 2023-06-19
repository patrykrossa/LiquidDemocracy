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
exports.updatePerson = exports.deletePerson = exports.getPersonById = exports.getPeople = exports.postPerson = void 0;
const db_1 = __importDefault(require("../../db"));
const queries = __importStar(require("./personQueries"));
const postPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { walletAddress, name, surname, birthday, livingAddress, pesel } = req.body;
        const peselInDatabase = yield db_1.default.query(queries.checkPeselExists, [pesel]);
        const walletAddressInDatabase = yield db_1.default.query(queries.checkWalletAddressExists, [walletAddress]);
        if (peselInDatabase.rows.length) {
            return res.status(400).json({ message: "Pesel already exists." });
        }
        else if (walletAddressInDatabase.rows.length) {
            return res.status(400).json({ message: "Wallet address already exists." });
        }
        else {
            let newPerson = yield db_1.default.query(queries.addPerson, [walletAddress, name, surname, birthday, livingAddress, pesel]);
            return res.status(201).json(newPerson.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.postPerson = postPerson;
const getPeople = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query(queries.getPeople, (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results.rows);
        });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPeople = getPeople;
const getPersonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        db_1.default.query(queries.getPersonById, [id], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            if (results.rows.length) {
                res.status(200).json(results.rows[0]);
            }
            else {
                res.status(400).json({ message: "Person does not exist. (Non existent id)" });
            }
        }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.getPersonById = getPersonById;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield db_1.default.query(queries.getPersonById, [id]);
        if (!user.rows.length) {
            res.status(400).json({ message: "Person does not exist. (Non existent id)" });
        }
        else {
            db_1.default.query(queries.deletePerson, [id], (error, results) => {
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
exports.deletePerson = deletePerson;
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        let { walletAddress, name, surname, birthday, livingAddress, pesel } = req.body;
        const person = yield db_1.default.query(queries.getPersonById, [id]);
        let walletAddressInDatabase = null;
        let peselInDatabase = null;
        if (name == null)
            name = person.rows[0]["name"];
        if (surname == null)
            surname = person.rows[0]["surname"];
        if (walletAddress == null)
            walletAddress = person.rows[0]["wallet_address"];
        else
            walletAddressInDatabase = yield db_1.default.query(queries.checkWalletAddressExists, [walletAddress]);
        if (pesel == null)
            pesel = person.rows[0]["pesel"];
        else
            peselInDatabase = yield db_1.default.query(queries.checkPeselExists, [pesel]);
        if (birthday == null)
            birthday = person.rows[0]["birthday"];
        if (livingAddress == null)
            livingAddress = person.rows[0]["living_address"];
        if (!person.rows.length) {
            res.status(400).json({ message: "Person does not exist. (Non existent id)" });
        }
        else if (peselInDatabase != null && peselInDatabase.rows.length && id != peselInDatabase.rows[0]["person_id"]) {
            return res.status(400).json({ message: "Pesel already exists." });
        }
        else if (walletAddressInDatabase != null && walletAddressInDatabase.rows.length && id != walletAddressInDatabase.rows[0]["person_id"]) {
            return res.status(400).json({ message: "Wallet address already exists." });
        }
        else {
            const newPerson = yield db_1.default.query(queries.updateUser, [walletAddress, name, surname, birthday, livingAddress, pesel, id]);
            res.status(200).json(newPerson.rows[0]);
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
});
exports.updatePerson = updatePerson;
