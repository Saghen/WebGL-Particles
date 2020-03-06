import { addAttribute } from "../../helpers";

function bindInitialOpacity(props, gl, program, options) {
  const attributes = {
    buffer: gl.createBuffer(),
    data: new Float32Array(
      new Array(options.count).fill().map(() => Math.random() * 2)
    ),
    location: gl.getAttribLocation(program, "initialOpacity")
  };
  addAttribute(gl, attributes.buffer, attributes.data, attributes.location, {
    size: 1
  });

  props.initialOpacities = attributes;
}

export { bindInitialOpacity };
