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
exports.deleteUser = exports.updateUser = exports.saveUser = exports.getUser = exports.getUsers = void 0;
const UserService_1 = require("../services/UserService");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, UserService_1.findAllNotDeletedUsers)();
        res.status(200).json({
            ok: true,
            msg: 'Datos recibidos correctamente',
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
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, UserService_1.findOneById)(id);
        res.status(200).json({
            ok: true,
            msg: 'Usuario enviado correctamente',
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
exports.getUser = getUser;
const saveUser = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, UserService_1.saveOneUser)(Object.assign(Object.assign({}, body), { state: false }));
        res.status(200).json({
            ok: true,
            msg: 'Usuario guardado correctamente',
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
exports.saveUser = saveUser;
const updateUser = ({ params, body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = params;
        const userDB = yield (0, UserService_1.updateOneUser)(Object.assign(Object.assign({}, body), { id }));
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            data: userDB,
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
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, UserService_1.deleteOneUser)(id);
        res.status(200).json({
            ok: true,
            msg: 'Usuario borrado correctamente',
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
exports.deleteUser = deleteUser;
//# sourceMappingURL=UserController.js.map