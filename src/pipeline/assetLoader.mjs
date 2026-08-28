/**
 * Custom ESM loader hook to allow importing image and media assets in Node.js runtime.
 */
export async function load(url, context, nextLoad) {
  if (/\.(jpg|jpeg|png|gif|webp|svg|mp3|wav|ogg|mp4|webm)$/i.test(url)) {
    return {
      format: 'module',
      shortCircuit: true,
      source: `export default ${JSON.stringify(url)};`,
    };
  }
  return nextLoad(url, context);
}
