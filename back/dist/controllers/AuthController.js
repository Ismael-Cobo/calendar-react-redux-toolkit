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
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.registerController = exports.loginController = void 0;
const AuthService_1 = require("../services/AuthService");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const user = yield (0, AuthService_1.login)(body);
        return res.status(200).json({
            ok: true,
            msg: 'usuario logeado correctamente',
            data: user,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.loginController = loginController;
const registerController = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, AuthService_1.registerNewUser)(body);
        return res.json({
            ok: true,
            msg: 'usuario registrado correctamente',
            data: user,
        });
    }
    catch (e) {
        res.status(e.statusCode || 500).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.registerController = registerController;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtByUser = req.headers.authorization;
    console.log(req.user);
    const token = jwtByUser === null || jwtByUser === void 0 ? void 0 : jwtByUser.split(' ').pop();
    return res.status(200).json({
        ok: true,
        msg: 'token revalidado',
        data: Object.assign(Object.assign({}, req.user), { token }),
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=AuthController.js.map