import { addAttribute } from "../../helpers";

function bindTime(props, gl, program, options) {
  const attributes = {
    buffer: gl.createBuffer(),
    data: new Float32Array(new Array(options.count).fill(0)),
    location: gl.getAttribLocation(program, "time")
  };
  addAttribute(gl, attributes.buffer, attributes.data, attributes.location, {
    size: 1
  });

  props.times = attributes;
}

export { bindTime };
