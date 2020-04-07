function updateBuffers(props, gl, options) {
  let { generating, positions, normals, times } = props;

  const indexSets = [];
  if (generating.index - generating.count >= 0) {
    indexSets.push([generating.index - generating.count, generating.index]);
  } else {
    indexSets.push([0, generating.index]);
    indexSets.push([
      options.count + generating.index - generating.count - 1,
      options.count - 1,
    ]);
  }

  for (const [startingIndex, endingIndex] of indexSets) {
    const count = endingIndex - startingIndex;
    gl.bindBuffer(gl.ARRAY_BUFFER, positions.buffer);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      startingIndex * 2 * Float32Array.BYTES_PER_ELEMENT,
      positions.data,
      startingIndex * 2,
      count * 2
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, normals.buffer);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      startingIndex * 2 * Float32Array.BYTES_PER_ELEMENT,
      normals.data,
      startingIndex * 2,
      count * 2
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, times.buffer);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      startingIndex * Float32Array.BYTES_PER_ELEMENT,
      times.data,
      startingIndex,
      count
    );
  }
}

export { updateBuffers };
