"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User_1 = require("./User");
exports.Events = connection_1.default.define('Events', {
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
    user_id: {
        type: sequelize_1.DataTypes.BIGINT,
        field: 'userId',
        allowNull: false,
        references: {
            model: User_1.User,
            key: 'id',
        },
    },
}, {
    timestamps: false,
    tableName: 'Events',
});
User_1.User.hasMany(exports.Events);
exports.Events.belongsTo(User_1.User);
//# sourceMappingURL=Event.js.map