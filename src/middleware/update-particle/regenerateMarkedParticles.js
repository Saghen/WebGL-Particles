import { generateParticle } from "../../particles";

function regenerateMarkedParticles(props, gl, options) {
  let { marking, generating, positions, normals, times, time } = props;

  // Figure out where to start if this is our first time generating particles
  if (!generating.wasGenerating) {
    generating.index = marking.index - marking.count;
    if (generating.index < 0)
      generating.index = options.count + generating.index;
  }

  let toGenerate;
  if (generating.index > marking.index)
    toGenerate = options.count - generating.index + marking.index;
  else toGenerate = marking.index - generating.index + 1;
  generating.count = 0;

  let index;
  for (; toGenerate; toGenerate--) {
    if (props.aborted) break;
    if (generating.index > options.count) generating.index = 0;
    if (!marking.marked[generating.index]) {
      generating.index++;
      generating.count++;
      continue;
    }

    marking.marked[generating.index] = false;

    index = generating.index * 2;
    const particle = generateParticle(
      props.width,
      props.height,
      options.size,
      0.1,
      0.03
    );

    positions.data[index] = particle.position[0];
    positions.data[index + 1] = particle.position[1];
    normals.data[index] = particle.normal[0];
    normals.data[index + 1] = particle.normal[1];
    times.data[generating.index] = time;

    generating.index++;
    generating.count++;
  }

  if (!props.aborted) props.wasGenerating = false;
}

export { regenerateMarkedParticles };
