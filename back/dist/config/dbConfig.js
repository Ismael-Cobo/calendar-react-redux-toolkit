"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = void 0;
exports.DB_HOST = process.env.DB_HOST || 'localhost';
exports.DB_USER = process.env.DB_USER || 'root';
exports.DB_PASSWORD = process.env.DB_PASSWORD || 'root';
exports.DB_NAME = process.env.DB_NAME || 'calendar';
exports.DB_PORT = Number(process.env.DB_PORT) || 3306;
exports.PORT = process.env.PORT || '3000';
//# sourceMappingURL=dbConfig.js.map