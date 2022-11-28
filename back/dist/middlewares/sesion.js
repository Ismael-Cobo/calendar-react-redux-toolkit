"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_1 = require("../handlers/jwt/jwt");
const checkJwt = (req, res, next) => {
    try {
        const jwtByUser = req.headers.authorization;
        const jwt = jwtByUser === null || jwtByUser === void 0 ? void 0 : jwtByUser.split(' ').pop();
        const isOk = (0, jwt_1.verifyToken)(`${jwt}`);
        req.user = {
            email: isOk.email,
            id: isOk.id,
            name: isOk.name,
        };
        if (!isOk) {
            return res.status(400).json({
                ok: false,
                msg: 'No se ha podido verificar el token',
                data: null,
            });
        }
        next();
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            msg: 'No se ha podido establecer una sesión',
            data: null,
        });
    }
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=sesion.js.map