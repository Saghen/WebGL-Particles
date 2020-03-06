import { addAttribute } from "../../helpers";

function bindNormal(props, gl, program, options) {
  const attributes = {
    buffer: gl.createBuffer(),
    data: new Float32Array(
      props.particles.map(particle => particle.normal).flat()
    ),
    location: gl.getAttribLocation(program, "normal")
  };
  addAttribute(gl, attributes.buffer, attributes.data, attributes.location);

  props.normals = attributes;
}

export { bindNormal };
