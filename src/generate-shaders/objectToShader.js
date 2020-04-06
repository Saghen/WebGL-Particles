function objectToShader(props, isVectorShader) {
  const lines = ["#version 300 es\n", "precision mediump float"];

  if (isVectorShader) {
    for (const attribute of props.attributes) {
      lines.push(`in ${attribute}`);
    }
  }
  for (const uniforms of props.uniforms) {
    lines.push(`uniform ${uniforms}`);
  }
  for (const varying of props.varying) {
    lines.push(`${isVectorShader ? "out" : "in"} ${varying}`);
  }

  for (const func of props.functions) {
    lines.push(func);
  }

  lines.push(`void main() {`);

  for (const mainLine of props.main) {
    lines.push(mainLine);
  }

  if (isVectorShader) lines.push("gl_Position = vec4(position, 0, 1.0);");
  else lines.push("outColor = vec4(r,g,b,a);");

  lines.push("}");

  return lines
    .map(line => (line.trimEnd().endsWith("}") ? line : line + ";"))
    .join("");
}
