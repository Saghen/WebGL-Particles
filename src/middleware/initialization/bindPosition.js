import { addAttribute } from "../../helpers";

function bindPosition(props, gl, program, options) {
  const attributes = {
    buffer: gl.createBuffer(),
    data: new Float32Array(
      props.particles.map(particle => particle.position).flat()
    ),
    location: gl.getAttribLocation(program, "position")
  };
  addAttribute(gl, attributes.buffer, attributes.data, attributes.location);

  props.positions = attributes;
}

export { bindPosition };
