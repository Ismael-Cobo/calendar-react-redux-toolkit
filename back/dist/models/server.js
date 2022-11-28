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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("../router");
const connection_1 = __importDefault(require("../db/connection"));
const dbConfig_1 = require("../config/dbConfig");
class Server {
    constructor() {
        this.apiPath = {
            users: '/api/users',
            auth: '/api/auth',
            event: '/api/event',
        };
        this.app = (0, express_1.default)();
        this.port = dbConfig_1.PORT;
        // Llamar a la base de datos
        this.dbConnection();
        // Definir middlewares
        this.middlewares();
        // Definir las rutas
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Listenig on port ${this.port}`));
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPath.users, router_1.userRouter);
        this.app.use(this.apiPath.auth, router_1.authRouter);
        this.app.use(this.apiPath.event, router_1.eventRouter);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.sync();
                console.log('database online');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map