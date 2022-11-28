"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const sesion_1 = require("../middlewares/sesion");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/register', AuthController_1.registerController);
exports.authRouter.post('/login', AuthController_1.loginController);
exports.authRouter.get('/renew', sesion_1.checkJwt, AuthController_1.renewToken);
//# sourceMappingURL=AuthRoutes.js.map