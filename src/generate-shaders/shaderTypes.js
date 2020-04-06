const baseAttributes = [
  "vec2 position",
  "vec2 normal",
  "float time",
  "float initialOpacity",
  "float depth"
];

const baseUniforms = ["vec2 u_screenSize", "float u_time", "float u_size"];

const baseVarying = ["float opacity", "vec2 pixelPosition"];

const baseVectorMainFunctions = [
  {
    target: "gl_Position",
    name: "pixelsToClipSpace",
    dependsOn: ["calculatePositionInPixels"],
    value: `vec4 pixelsToClipSpace() {
              return vec4(pixelPosition / u_screenSize * 2.0 - 1.0, gl_Position.y, gl_Position.w);
            }`
  },
  {
    target: "pixelPosition",
    name: "calculatePositionInPixels",
    value: `vec2 calculatePositionInPixels() {
              return position + normal * (u_time - time);
            }`
  },
  {
    target: "opacity",
    name: "varyingOpacity",
    value: `float varyingOpacity() {
              float newOpacity = mod(initialOpacity + u_time / 10000.0, 2.0);
              if (newOpacity > 1.0) newOpacity = 2.0 - newOpacity;
              return newOpacity;
            }`
  }
];

const baseVectorShader = {
  attributes: baseAttributes,
  uniforms: baseUniforms,
  varying: baseVarying
};
