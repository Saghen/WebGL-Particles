import config from "./config";
import { randomNumberInRange, randomNumberOutsideRange } from "./helpers";

/**
 *
 * @param {WebGL2RenderingContext} gl
 */
/*
function generateParticle(gl, size, speed, speedRandomness) {
  const isTopBottom = Math.random() >= 9 / 25;

  const x = !isTopBottom
    ? randomNumberOutsideRange(-size, containerWidth + size, size)
    : randomNumberInRange(-size, containerWidth + size);
  const y = isTopBottom
    ? randomNumberOutsideRange(-size, containerHeight + size, size)
    : randomNumberInRange(-size, containerHeight + size);

  const angles = [
    Math.atan2(0 - y, 0 - x),
    Math.atan2(containerHeight - y, 0 - x),
    Math.atan2(0 - y, containerWidth - x),
    Math.atan2(containerHeight - y, containerWidth - x)
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
*/
/**
 *
 * @param {WebGL2RenderingContext} gl
 */
function generateParticle(containerWidth, containerHeight, size, speed, speedRandomness, onScreen) {
  const randomSpeed =
    Math.random() * randomNumberInRange(-speedRandomness, speedRandomness) +
    speed;

  if (onScreen) {
    const randomAngle = randomNumberInRange(0, Math.PI * 2);
    return {
      position: [
        randomNumberInRange(0, containerWidth),
        randomNumberInRange(0, containerHeight)
      ],
      normal: [
        Math.cos(randomAngle) * randomSpeed,
        Math.sin(randomAngle) * randomSpeed
      ]
    };
  }
  const x = randomNumberInRange(-size * 2, 0);
  const y = randomNumberInRange(-size, containerHeight + size);

  const angles = [
    Math.atan2(0 - y, 0 - x),
    Math.atan2(containerHeight - y, 0 - x),
    Math.atan2(0 - y, containerWidth - x),
    Math.atan2(containerHeight - y, containerWidth - x)
  ];

  const maxAngle = Math.max(...angles) / 2;
  const minAngle = Math.min(...angles) / 2;

  return {
    position: [x, y],
    normal: [
      Math.cos(randomNumberInRange(minAngle, maxAngle)) * randomSpeed,
      Math.sin(randomNumberInRange(minAngle, maxAngle)) * randomSpeed
    ]
  };
}

function generateParticles(
  gl,
  {
    count = config.count,
    size = config.size,
    speed = config.speed,
    speedRandomness = config.speedRandomness,
    onScreen = false
  } = {}
) {
  return new Array(count)
    .fill()
    .map(() => generateParticle(gl.canvas.width, gl.canvas.height, size, speed, speedRandomness, onScreen));
}

export { generateParticle, generateParticles };
