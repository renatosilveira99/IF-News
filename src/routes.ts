import { Router } from 'express'
import { CreateUserController } from './modules/Users/controllers/CreateUserController';

const routes = Router();

// Users
routes.post('/create_user', new CreateUserController().handle);

// News

// Projects

// Post Requests

// RegistrationRequests

export { routes }