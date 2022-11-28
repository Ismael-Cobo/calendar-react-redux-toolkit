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
exports.deleteOneUser = exports.updateOneUser = exports.saveOneUser = exports.findOneByEmail = exports.findOneById = exports.findAllNotDeletedUsers = exports.findAllUsers = void 0;
const User_1 = require("../models/User");
const handlers_1 = require("../handlers");
const bcrypt_1 = require("../handlers/bcrypt/bcrypt");
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findAll();
});
exports.findAllUsers = findAllUsers;
const findAllNotDeletedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findAll({ where: { state: false } });
});
exports.findAllNotDeletedUsers = findAllNotDeletedUsers;
const findOneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    const userToFind = yield User_1.User.findByPk(id);
    if (!userToFind)
        throw new handlers_1.UserNotFound('El usuario no se ha podido encontrar', 404);
    return userToFind;
});
exports.findOneById = findOneById;
const findOneByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        throw new handlers_1.IllegalArguments('Error, el email es obligatorio', 400);
    const userToFind = yield User_1.User.findOne({ where: { email } });
    if (!userToFind)
        throw new handlers_1.UserNotFound('El usuario no se ha podido encontrar', 404);
    return userToFind;
});
exports.findOneByEmail = findOneByEmail;
const saveOneUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new handlers_1.IllegalArguments('Error, el usuario es obligatorio', 400);
    const userToFind = yield User_1.User.findOne({ where: { email: user.email } });
    if (userToFind)
        throw new handlers_1.UserAlreadyExists('El usuario ya existe con ese email', 400);
    const passwordHashed = yield (0, bcrypt_1.encryptPassword)(user.password);
    return yield User_1.User.create(Object.assign(Object.assign({}, user), { password: passwordHashed }));
});
exports.saveOneUser = saveOneUser;
const updateOneUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new handlers_1.IllegalArguments('Error, el usuario es obligatorio', 400);
    const userToFind = yield User_1.User.findOne({ where: { id: user.id } });
    if (!userToFind)
        throw new handlers_1.UserNotFound('El usuario no se ha podido encontrar', 404);
    return yield userToFind.update(user);
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    const userToFind = yield User_1.User.findOne({ where: { id } });
    if (!userToFind)
        throw new handlers_1.UserNotFound('El usuario no se ha podido encontrar', 404);
    yield userToFind.update({ state: true });
    return true;
});
exports.deleteOneUser = deleteOneUser;
//# sourceMappingURL=UserService.js.map