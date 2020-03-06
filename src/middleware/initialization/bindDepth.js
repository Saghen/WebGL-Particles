import { addAttribute } from "../../helpers";

function bindDepth(props, gl, program, options) {
  const attributes = {
    buffer: gl.createBuffer(),
    data: new Float32Array(
      Object.keys(new Array(options.count).fill()).map(depth => depth / options.count)
    ),
    location: gl.getAttribLocation(program, "depth")
  };
  addAttribute(gl, attributes.buffer, attributes.data, attributes.location, {
    size: 1
  });

  props.initialOpacities = attributes;
}

export { bindDepth };
