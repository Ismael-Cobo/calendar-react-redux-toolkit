"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const middlewares_1 = require("../middlewares");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', UserController_1.getUsers);
exports.userRouter.get('/:id', UserController_1.getUser);
exports.userRouter.post('/', middlewares_1.checkJwt, UserController_1.saveUser);
exports.userRouter.put('/:id', [middlewares_1.checkJwt, middlewares_1.isSameUser], UserController_1.updateUser);
exports.userRouter.delete('/:id', [middlewares_1.checkJwt, middlewares_1.isSameUser], UserController_1.deleteUser);
//# sourceMappingURL=UserRoutes.js.map