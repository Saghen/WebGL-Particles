import { detectOutOfRange } from "./detectOutOfRange";
import { regenerateMarkedParticles } from "./regenerateMarkedParticles";
import { updateBuffers } from "./updateBuffers";

export default {
  middleware: [detectOutOfRange, regenerateMarkedParticles],
  afterMiddleware: [updateBuffers],
};
