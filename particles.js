/**
 *
 * @param {WebGL2RenderingContext} gl
 */
function generateParticle(gl, size, speed, speedRandomness) {
  const isTopBottom = Math.random() >= 9 / 25;

  const x = !isTopBottom
    ? randomNumberOutsideRange(-size, gl.canvas.width + size, size)
    : randomNumberInRange(-size, gl.canvas.width + size);
  const y = isTopBottom
    ? randomNumberOutsideRange(-size, gl.canvas.height + size, size)
    : randomNumberInRange(-size, gl.canvas.height + size);

  const angles = [
    Math.atan2(0 - y, 0 - x),
    Math.atan2(gl.canvas.height - y, 0 - x),
    Math.atan2(0 - y, gl.canvas.width - x),
    Math.atan2(gl.canvas.height - y, gl.canvas.width - x)
  ];

  const maxAngle = Math.max(...angles);
  const minAngle = Math.min(...angles);

  const randomSpeed =
    Math.random() * randomNumberInRange(-speedRandomness, speedRandomness) +
    speed;

  return {
    position: [x, y],
    normal: [
      Math.cos(randomNumberInRange(minAngle, maxAngle)) * randomSpeed,
      Math.sin(randomNumberInRange(minAngle, maxAngle)) * randomSpeed
    ]
  };
}
