import { bindInitialOpacity } from "./bindInitialOpacity";
import { bindNormal } from "./bindNormal";
import { bindPosition } from "./bindPosition";
import { bindTime } from "./bindTime";
import { createVertexArray } from "./createVertexArray";
import { generateParticles } from "./generateParticles";

export default [
  generateParticles,
  createVertexArray,
  bindInitialOpacity,
  bindNormal,
  bindPosition,
  bindTime
];
