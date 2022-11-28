"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clientes = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Clientes = connection_1.default.define('Cliente', {
    dni: sequelize_1.DataTypes.STRING(10),
    email: sequelize_1.DataTypes.STRING(150),
    nombre: sequelize_1.DataTypes.STRING(150),
    apellidos: sequelize_1.DataTypes.STRING(150),
    edad: sequelize_1.DataTypes.DATEONLY(),
    telefono: sequelize_1.DataTypes.STRING(9),
    foto: sequelize_1.DataTypes.STRING(150),
    password: sequelize_1.DataTypes.STRING(150),
    pais: sequelize_1.DataTypes.STRING(100),
    ciudad: sequelize_1.DataTypes.STRING(150),
    cpostal: sequelize_1.DataTypes.STRING(10),
    direccion: sequelize_1.DataTypes.STRING(150),
    rol: sequelize_1.DataTypes.STRING(100),
    idioma: sequelize_1.DataTypes.TEXT(),
    descripcion: sequelize_1.DataTypes.TEXT(),
    isHost: sequelize_1.DataTypes.INTEGER(),
}, { tableName: 'Clientes', timestamps: false });
//# sourceMappingURL=Cliente.js.map