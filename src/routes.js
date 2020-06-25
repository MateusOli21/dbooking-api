const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const BookingController = require('./app/controllers/BookingController');
const TablesController = require('./app/controllers/TableController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users/:id', UserController.update);

routes.post('/bookings', BookingController.store);
routes.delete('/bookings/:id', BookingController.delete);

routes.get('/tables', TablesController.index);

module.exports = routes;
