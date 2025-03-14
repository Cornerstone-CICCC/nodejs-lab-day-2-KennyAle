"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
dotenv_1.default.config();
// Start Server
const app = (0, express_1.default)();
// Middleware
const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error('Missing Cookie Keys');
}
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [
        SIGN_KEY,
        ENCRYPT_KEY
    ],
    maxAge: 5 * 60 * 1000
}));
app.use((0, cors_1.default)({
    origin: ['http://localhost:4321', 'http://localhost:4500'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/', user_routes_1.default);
// 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});
// Run server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
