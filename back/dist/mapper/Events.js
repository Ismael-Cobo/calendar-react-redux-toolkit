"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMapper = void 0;
class EventMapper {
    constructor({ title, description, id, start, end, user }) {
        return {
            title,
            notes: description,
            id,
            start: new Date(start),
            end: new Date(end),
            user: { _id: user === null || user === void 0 ? void 0 : user.id, name: user === null || user === void 0 ? void 0 : user.name },
        };
    }
}
exports.EventMapper = EventMapper;
//# sourceMappingURL=Events.js.map