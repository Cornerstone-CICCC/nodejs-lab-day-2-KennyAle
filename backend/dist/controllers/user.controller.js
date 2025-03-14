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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsers = (req, res) => {
    const users = user_model_1.default.getUsers();
    res.status(200).json(users);
};
const getUserByUsername = (req, res) => {
    if (req.session && req.session.username) {
        const user = user_model_1.default.findByUserName(req.session.username);
        res.status(200).json(user);
    }
    res.status(500).send('User is not logged in');
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).send('Missing credentials');
        return;
    }
    const user = yield user_model_1.default.login(username, password);
    if (!user) {
        res.status(500).send('Incorrect credentials');
        return;
    }
    if (req.session) {
        req.session.isLoggedId = true;
        req.session.username = user.username;
    }
    res.status(200).send('You are logged in');
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({ error: 'Missing parameters' });
        return;
    }
    const user = yield user_model_1.default.create({ username, password, firstname, lastname });
    if (!user) {
        res.status(409).json({ error: 'Username is taken' });
        return;
    }
    res.status(201).json(user);
});
const logout = (req, res) => {
    req.session = null;
    res.status(300).send('Cookie cleared');
};
exports.default = {
    getUsers,
    getUserByUsername,
    loginUser,
    addUser,
    logout
};
