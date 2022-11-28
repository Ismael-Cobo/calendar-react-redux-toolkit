"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../config/dbConfig");
const db = new sequelize_1.Sequelize(dbConfig_1.DB_NAME, dbConfig_1.DB_USER, dbConfig_1.DB_PASSWORD, {
    host: dbConfig_1.DB_HOST,
    dialect: 'mysql',
    logging: true,
    port: dbConfig_1.DB_PORT,
});
exports.default = db;
//# sourceMappingURL=connection.js.map