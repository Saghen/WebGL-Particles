function detectOutOfRange(props, gl, options) {
  let { marking, generating, positions, normals, times, time } = props;

  // If we haven't finished generating, then skip to generating
  if (marking.wasMarking && generating.index !== marking.index) return;

  marking.count = 0;
  marking.wasMarking = true;
  // Avoid long GC due to tens of thousands of variables
  let index, x, y, normalX, normalY, particleTime;

  if (marking.index >= options.count) marking.index = 0;
  for (let i = options.updatesPerFrame - 1; i; i--) {
    if (marking.index >= options.count) marking.index = 0;
    if (props.aborted) break;
    index = marking.index * 2;

    normalX = normals.data[index];
    normalY = normals.data[index + 1];
    particleTime = times.data[marking.index];

    x = positions.data[index] + normalX * (time - particleTime);
    y = positions.data[index + 1] + normalY * (time - particleTime);

    // Avoids setting the array unless absolutely necessary yielding a 3-4x performance uplift
    if (
      ((x > props.width + options.size || x < -options.size) &&
        Math.sign(x) === Math.sign(normals.data[index])) ||
      ((y > props.height + options.size || y < -options.size) &&
        Math.sign(y) === Math.sign(normals.data[index + 1]))
    )
      marking.marked[marking.index] = true;

    marking.index++;
    marking.count++;
  }

  if (!props.aborted) marking.wasMarking = false;
}

export { detectOutOfRange };
