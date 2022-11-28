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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneEventById = exports.updateOneEvent = exports.saveOneEvent = exports.findOneEventById = exports.findAllByUserId = exports.findAll = void 0;
const handlers_1 = require("../handlers");
const mapper_1 = require("../mapper");
const Event_1 = require("../models/Event");
const User_1 = require("../models/User");
const UserService_1 = require("./UserService");
const findAll = (includeUser) => __awaiter(void 0, void 0, void 0, function* () {
    const eventsToMap = yield Event_1.Events.findAll(includeUser ? { include: [{ model: User_1.User }] } : {});
    const events = [];
    eventsToMap.forEach((event) => {
        const e = new mapper_1.EventMapper(event);
        events.push(e);
    });
    return events;
});
exports.findAll = findAll;
const findAllByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    const userToFind = yield User_1.User.findByPk(userId);
    if (!userToFind)
        throw new handlers_1.UserNotFound('No se ha encontrado al usuario', 404);
    const eventsToMap = yield Event_1.Events.findAll({ where: { user_id: userId }, include: [{ model: User_1.User }] });
    const events = [];
    eventsToMap.forEach((event) => {
        const e = new mapper_1.EventMapper(event);
        events.push(e);
    });
    return events;
});
exports.findAllByUserId = findAllByUserId;
const findOneEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    const eventToFind = yield Event_1.Events.findByPk(id, { include: [{ model: User_1.User }] });
    if (!eventToFind)
        throw new handlers_1.EventNotFound('No se ha encontrado el evento', 404);
    return new mapper_1.EventMapper(eventToFind);
    // return eventToFind
});
exports.findOneEventById = findOneEventById;
const saveOneEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    yield (0, UserService_1.findOneById)(String(event.user_id));
    const eventToSave = yield Event_1.Events.create(event, { include: [{ model: User_1.User }] });
    return new mapper_1.EventMapper(eventToSave);
});
exports.saveOneEvent = saveOneEvent;
const updateOneEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event || !event.id)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    const { start, end } = event;
    if (start > end)
        throw new handlers_1.DateEvent('La fecha de inicio ha de ser anterior a la final', 400);
    yield (0, UserService_1.findOneById)(String(event.user_id));
    const eventToUpdate = yield Event_1.Events.findByPk(event.id, { include: [{ model: User_1.User }] });
    if (!eventToUpdate)
        throw new handlers_1.EventNotFound('No se ha encontrado el evento', 404);
    yield eventToUpdate.update(event);
    return new mapper_1.EventMapper(eventToUpdate);
});
exports.updateOneEvent = updateOneEvent;
const deleteOneEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new handlers_1.IllegalArguments('Error, hable con el administrador', 500);
    const eventToDelete = yield Event_1.Events.findByPk(id);
    if (!eventToDelete)
        throw new handlers_1.EventNotFound('No se ha encontrado el evento', 404);
    yield eventToDelete.destroy();
    return true;
});
exports.deleteOneEventById = deleteOneEventById;
//# sourceMappingURL=EventService.js.map