function detectOutOfRange(props, gl, options) {
  let { marking, generating, positions, normals, times, time } = props;

  // If we haven't finished generating, then skip to generating
  if (marking.wasMarking && generating.index !== marking.index) return;

  let markingIndex = marking.index;
  marking.count = 0;
  marking.wasMarking = true;
  // Avoid long GC due to tens of thousands of variables
  let index, x, y, particleTime;

  if (markingIndex >= options.count) markingIndex = 0;
  for (let i = options.updatesPerFrame - 1; i; i--) {
    if (markingIndex >= options.count) markingIndex = 0;
    if (props.aborted) break;
    index = markingIndex * 2;
    particleTime = times.data[markingIndex];
    x = positions.data[index] + normals.data[index] * (time - particleTime);
    y =
      positions.data[index + 1] +
      normals.data[index + 1] * (time - particleTime);

    marking.marked[markingIndex] =
      ((x > props.width + options.size || x < -options.size) &&
        Math.sign(x) === Math.sign(normals.data[index])) ||
      ((y > props.height + options.size || y < -options.size) &&
        Math.sign(y) === Math.sign(normals.data[index + 1]));

    markingIndex++;
    marking.count++;
  }

  if (!props.aborted) marking.wasMarking = false;
  marking.index = markingIndex;
}

export { detectOutOfRange };
