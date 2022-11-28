"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameUser = void 0;
const isSameUser = ({ params, user, body }, res, next) => {
    const { user_id } = body;
    console.log(user_id, user === null || user === void 0 ? void 0 : user.id);
    if ((user === null || user === void 0 ? void 0 : user.id) && Number(user.id) !== Number(user_id)) {
        return res.status(403).json({
            ok: false,
            msg: 'No estás autorizado a modificar las propiedades',
            data: null,
        });
    }
    next();
};
exports.isSameUser = isSameUser;
//# sourceMappingURL=isSameUser.js.map