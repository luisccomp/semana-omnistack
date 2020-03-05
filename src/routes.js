/* O arquivo routes.js é responsável pelas rotas da nossa aplicação no backend.
 * Toda rota deve ser registrada nesse arquivo juntamente do seu respectivo
 * método HTTP: GET, PUT, DELETE ou POST (há outros, mas esses são os mais
 * comuns).
 */
const { Router } = require('express');

const DevController = require('./controllers/DevController');
const HomeController = require('./controllers/HomeController');
const SearchController = require('./controllers/SearchController');


const routes = Router();

// Rotas que são tratadas pelo HomeController
routes.get('/', HomeController.index);

// Rotas tratadas pelo DevController
routes.get('/api/devs', DevController.index);
routes.post('/api/devs', DevController.store);

// Rotas tratadas pelo search controller
routes.get('/api/search', SearchController.index);

module.exports = routes;
