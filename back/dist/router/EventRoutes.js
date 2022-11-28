"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const CalendarController_1 = require("../controllers/CalendarController");
const middlewares_1 = require("../middlewares");
exports.eventRouter = (0, express_1.Router)();
exports.eventRouter.get('/', middlewares_1.checkJwt, CalendarController_1.getEvents);
exports.eventRouter.get('/user/:id', [middlewares_1.checkJwt, middlewares_1.isSameUser], CalendarController_1.getEventsByUserId);
exports.eventRouter.get('/:id', middlewares_1.checkJwt, CalendarController_1.getEventById);
exports.eventRouter.post('/', middlewares_1.checkJwt, CalendarController_1.saveEvent);
exports.eventRouter.put('/', [middlewares_1.checkJwt, middlewares_1.isSameUser], CalendarController_1.updateEvent);
exports.eventRouter.delete('/:id', [middlewares_1.checkJwt, middlewares_1.isSameUser], CalendarController_1.deleteEvent);
//# sourceMappingURL=EventRoutes.js.map