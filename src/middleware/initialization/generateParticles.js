import { generateParticles } from "../../particles";

function generateParticlesFunc(props, gl, program, options) {
  props.particles = generateParticles(gl, { onScreen: true });
}

export { generateParticlesFunc as generateParticles };
