"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User_1 = require("./User");
exports.Event = connection_1.default.define('Events', {
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    start: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    end: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'UserId',
        references: {
            model: User_1.User,
            key: 'id',
        },
    },
});
User_1.User.hasMany(exports.Event);
exports.Event.belongsTo(User_1.User);
//# sourceMappingURL=Calendar.js.map