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
exports.deleteEvent = exports.updateEvent = exports.saveEvent = exports.getEventById = exports.getEventsByUserId = exports.getEvents = void 0;
const EventService_1 = require("../services/EventService");
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, EventService_1.findAll)(true);
        return res.status(200).json({
            ok: true,
            msg: 'Eventos obtenidos correctamente',
            data: events,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.getEvents = getEvents;
const getEventsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const events = yield (0, EventService_1.findAllByUserId)(+id);
        return res.status(200).json({
            ok: true,
            msg: 'Eventos obtenidos correctamente',
            data: events,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.getEventsByUserId = getEventsByUserId;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield (0, EventService_1.findOneEventById)(+id);
        return res.status(200).json({
            ok: true,
            msg: 'Evento obtenido correctamente',
            data: event,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.getEventById = getEventById;
const saveEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventSaved = yield (0, EventService_1.saveOneEvent)(req.body);
        return res.status(200).json({
            ok: true,
            msg: 'Evento guardado correctemente',
            data: eventSaved,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.saveEvent = saveEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventUpdated = yield (0, EventService_1.updateOneEvent)(req.body);
        return res.status(200).json({
            ok: true,
            msg: 'Evento guardado correctemente',
            data: eventUpdated,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = params;
        const eventUpdated = yield (0, EventService_1.deleteOneEventById)(+id);
        return res.status(200).json({
            ok: true,
            msg: 'Evento eliminado correctemente',
            data: eventUpdated,
        });
    }
    catch (e) {
        res.status(e.statusCode).json({
            ok: false,
            msg: e.message,
            data: null,
        });
    }
});
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=CalendarController.js.map