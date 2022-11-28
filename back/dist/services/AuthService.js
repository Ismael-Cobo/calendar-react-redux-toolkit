'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.login = exports.registerNewUser = void 0
const handlers_1 = require('../handlers')
const User_1 = require('../models/User')
const UserNotFound_1 = require('../handlers/errors/UserNotFound')
const bcrypt_1 = require('../handlers/bcrypt/bcrypt')
const jwt_1 = require('../handlers/jwt/jwt')
const registerNewUser = ({ email, name, password }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const checkUserExist = yield User_1.User.findOne({ where: { email } })
    if (checkUserExist) throw new handlers_1.UserAlreadyExists('User already exist', 404)
    const passwordHashed = yield (0, handlers_1.encryptPassword)(password)
    return yield User_1.User.create({ email, name, password: passwordHashed, state: false })
  })
exports.registerNewUser = registerNewUser
const login = ({ email, password, name }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userToFind = yield User_1.User.findOne({ where: { email } })
    if (!userToFind) throw new UserNotFound_1.UserNotFound('Credenciales incorrectas', 400)
    const passwordHashed = yield (0, bcrypt_1.verifyPassword)(password, userToFind.password)
    if (!passwordHashed) throw new UserNotFound_1.UserNotFound('Credenciales incorrectas', 400)
    const token = (0, jwt_1.generateToken)({ id: `${userToFind.id}` || '', email, name: userToFind.name })
    const data = Object.assign(Object.assign({}, userToFind.dataValues), { token })
    return data
  })
exports.login = login
//# sourceMappingURL=AuthService.js.map
