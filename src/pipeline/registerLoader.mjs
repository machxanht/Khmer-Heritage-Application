import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register(pathToFileURL('./src/pipeline/assetLoader.mjs').href, import.meta.url);
