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
exports.verifyPassword = exports.encryptPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const encryptPassword = (plaiPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.hash)(plaiPass, 8);
});
exports.encryptPassword = encryptPassword;
const verifyPassword = (plainPass, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(plainPass, hashedPass);
});
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=bcrypt.js.map