import { resize, initCanvas } from "./helpers";
import { generateParticle } from "./particles";
import { initialization } from "./middleware";
import config from "./config";

const { size, count, updatesPerFrame } = config;

const [gl, program] = initCanvas("canvas");

const screenSizeLocation = gl.getUniformLocation(program, "u_screenSize");
const timeUniformLocation = gl.getUniformLocation(program, "u_time");

const { positions, normals, times } = initialization.run(
  {},
  gl,
  program,
  config
);

requestAnimationFrame(drawScene);

let particleIndex = 0;
function drawScene(time) {
  const width = gl.canvas.width;
  const height = gl.canvas.height;
  resize(gl.canvas);
  gl.viewport(0, 0, width, height);

  let particleTime = 0;

  if (particleIndex >= config.count) particleIndex = 0;
  for (let i = 0; i < updatesPerFrame; i++) {
    const index = particleIndex * 2;
    particleTime = times.data[particleIndex];
    const x =
      positions.data[index] + normals.data[index] * (time - particleTime);
    const y =
      positions.data[index + 1] +
      normals.data[index + 1] * (time - particleTime);

    if (
      ((x > width + size || x < -size) &&
        Math.sign(x) === Math.sign(normals.data[index])) ||
      ((y > height + size || y < -size) &&
        Math.sign(y) === Math.sign(normals.data[index + 1]))
    ) {
      const particle = generateParticle(width, height, size, 0.1, 0.03);

      positions.data[index] = particle.position[0];
      positions.data[index + 1] = particle.position[1];
      normals.data[index] = particle.normal[0];
      normals.data[index + 1] = particle.normal[1];
      times.data[particleIndex] = time;
    }
    particleIndex++;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positions.buffer);
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    (particleIndex - updatesPerFrame) * 2 * Float32Array.BYTES_PER_ELEMENT,
    positions.data,
    (particleIndex - updatesPerFrame) * 2,
    updatesPerFrame * 2
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, normals.buffer);
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    (particleIndex - updatesPerFrame) * 2 * Float32Array.BYTES_PER_ELEMENT,
    normals.data,
    (particleIndex - updatesPerFrame) * 2,
    updatesPerFrame * 2
  );

  gl.bindBuffer(gl.ARRAY_BUFFER, times.buffer);
  gl.bufferSubData(
    gl.ARRAY_BUFFER,
    (particleIndex - updatesPerFrame) * Float32Array.BYTES_PER_ELEMENT,
    times.data,
    particleIndex - updatesPerFrame,
    updatesPerFrame
  );

  gl.useProgram(program);

  gl.uniform2f(screenSizeLocation, width, height);
  gl.uniform1f(timeUniformLocation, time);

  gl.drawArrays(gl.POINTS, 0, count);

  particleIndex++;
  requestAnimationFrame(drawScene);
}
