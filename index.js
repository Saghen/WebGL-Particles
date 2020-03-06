const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");

const size = 2;

const vertexShaderSource = document.querySelector("#vertex-shader").text.trim();
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

const screenSizeLocation = gl.getUniformLocation(program, "u_screenSize");
const timeUniformLocation = gl.getUniformLocation(program, "u_time");

const positionLocation = gl.getAttribLocation(program, "position");
const normalLocation = gl.getAttribLocation(program, "normal");
const timeLocation = gl.getAttribLocation(program, "time");

let particles = new Array(5000).fill().map(() => generateParticle(gl, size, 0.4, 0.2));

let positions = new Float32Array(
  particles.map(particle => particle.position).flat()
);
let normals = new Float32Array(
  particles.map(particle => particle.normal).flat()
);
let times = new Float32Array(new Array(particles.length).fill(0));

const particleVao = gl.createVertexArray();
gl.bindVertexArray(particleVao);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const normalBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
gl.bufferData(gl.ARRAY_BUFFER, normals, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(normalLocation);
gl.vertexAttribPointer(normalLocation, 2, gl.FLOAT, false, 0, 0);

const timeBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, timeBuffer);
gl.bufferData(gl.ARRAY_BUFFER, times, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(timeLocation);
gl.vertexAttribPointer(timeLocation, 1, gl.FLOAT, false, 0, 0);

requestAnimationFrame(drawScene);

let particlesPerFrame = 50;
let particleIndex = 0;
function drawScene(time) {
  resize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  if (particleIndex >= particles.length) particleIndex = 0;
  for (let i = 0; i <= particlesPerFrame; i++) {
    const index = particleIndex * 2;
    const [x, y] = positions
      .slice(index, index + 2)
      .map(
        (val, i) => val + normals[index + i] * (time - times[particleIndex])
      );
    if (
      ((x > gl.canvas.width + size || x < -size) &&
        Math.sign(x) === Math.sign(normals[index])) ||
      ((y > gl.canvas.height + size || y < -size) &&
        Math.sign(y) === Math.sign(normals[index + 1]))
    ) {
      const particle = generateParticle(gl, size, 0.4, 0.2);
      positions[index] = particle.position[0];
      positions[index + 1] = particle.position[1];
      normals[index] = particle.normal[0];
      normals[index + 1] = particle.normal[1];
      times[particleIndex] = time;

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ARRAY_BUFFER, timeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, times, gl.STATIC_DRAW);
    }
    particleIndex++;
    if (particleIndex >= particles.length) particleIndex = 0;
  }

  gl.useProgram(program);

  gl.uniform2f(screenSizeLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform1f(timeUniformLocation, time);

  var primitiveType = gl.POINTS;
  var offset = 0;
  var count = 5000;
  gl.drawArrays(primitiveType, offset, count);

  particleIndex++;
  requestAnimationFrame(drawScene);
}
