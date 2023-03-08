import {Router} from 'express';
import {signup, user} from '../controllers/controllers.js';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

/*routes.get('/api', (req, res) => {
  res.json({message: 'Hola desde el servidor!'});
});*/

// Add routes
routes.post('/api/signin', user);
routes.post('/api/signup', signup);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default routes;
