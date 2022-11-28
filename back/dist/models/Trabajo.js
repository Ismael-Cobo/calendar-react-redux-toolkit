"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trabajo = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Cliente_1 = require("./Cliente");
exports.Trabajo = connection_1.default.define('Trabajos', {
    estrellas: sequelize_1.DataTypes.INTEGER(),
    disponibilidadinicial: sequelize_1.DataTypes.DATEONLY(),
    disponibilidadfinal: sequelize_1.DataTypes.DATEONLY(),
    descripcion: sequelize_1.DataTypes.TEXT(),
    ayuda: sequelize_1.DataTypes.TEXT(),
    idioma: sequelize_1.DataTypes.TEXT(),
    residencia: sequelize_1.DataTypes.TEXT(),
    otros: sequelize_1.DataTypes.TEXT(),
    viajerosMinimo: sequelize_1.DataTypes.TEXT(),
    horasdia: sequelize_1.DataTypes.TEXT(),
    alojamiento: sequelize_1.DataTypes.TEXT(),
    image: sequelize_1.DataTypes.STRING(250),
    ClienteId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'ClienteId',
        references: {
            model: Cliente_1.Clientes,
            key: 'id',
        },
    },
    titulo: sequelize_1.DataTypes.STRING(250),
}, { tableName: 'Trabajos', timestamps: false });
Cliente_1.Clientes.hasMany(exports.Trabajo);
exports.Trabajo.belongsTo(Cliente_1.Clientes);
//# sourceMappingURL=Trabajo.js.map