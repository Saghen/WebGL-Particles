function createVertexArray(props, gl, program, options) {
  props.vao = gl.createVertexArray();
  gl.bindVertexArray(props.vao);
}

export { createVertexArray };
