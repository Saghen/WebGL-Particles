import { detectOutOfRange } from "./detectOutOfRange";
import { generateParticles } from "./generateParticles";
import { updateBuffers } from "./updateBuffers";

export default {
  middleware: [
  detectOutOfRange,
  generateParticles,],
  afterMiddleware: [updateBuffers]
}
