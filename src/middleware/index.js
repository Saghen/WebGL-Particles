import Middleware from "./middleware";

import initializationMiddleware from "./initialization";

const initialization = new Middleware();
initializationMiddleware.forEach(initialization.use);

const updateParticle = new Middleware();
const generateShaders = new Middleware();

export { initialization, updateParticle, generateShaders };
