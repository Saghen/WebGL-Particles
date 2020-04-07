import Middleware from "./middleware";

import initializationMiddleware from "./initialization";
import updateParticlesMiddleware from './update-particle';

const initialization = new Middleware();
initializationMiddleware.forEach(initialization.use);

const updateParticles = new Middleware();
updateParticlesMiddleware.middleware.forEach(updateParticles.use);
updateParticlesMiddleware.afterMiddleware.forEach(updateParticles.useAfter);

const generateShaders = new Middleware();

export { initialization, updateParticles, generateShaders };
