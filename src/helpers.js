function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function randomNumberOutsideRange(start, end, maxRange) {
  const size = end - start;
  const offset = (start + end) / 2 - size / 2;
  return (
    ((Math.random() >= 0.5) * 2 - 1) * (size / 2 + Math.random() * maxRange) +
    size / 2 +
    offset
  );
}

function randomNumberInRange(start, end) {
  return Math.random() * (end - start) + start;
}

function initCanvas(selector) {
  const canvas = document.querySelector(selector);
  const gl = canvas.getContext("webgl2", { premultipliedAlpha: false, alpha: true });
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const vertexShaderSource = document
    .querySelector("#vertex-shader")
    .text.trim();
  const fragmentShaderSource = document
    .querySelector("#fragment-shader")
    .text.trim();

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const program = createProgram(gl, vertexShader, fragmentShader);

  return [gl, program];
}

function addAttribute(
  gl,
  buffer,
  data,
  location,
  {
    size = 2,
    type = gl.FLOAT,
    usage = gl.DYNAMIC_DRAW,
    target = gl.ARRAY_BUFFER
  } = {}
) {
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, usage);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, type, false, 0, 0);
}

export {
  resize,
  createShader,
  randomNumberOutsideRange,
  randomNumberInRange,
  initCanvas,
  addAttribute
};
