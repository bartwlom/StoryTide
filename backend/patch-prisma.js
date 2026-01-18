
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Patching Prisma for Cloudflare Workers compatibility...');

// Patch the Prisma runtime library (client.mjs)
const runtimeMjsPath = join(__dirname, 'node_modules/@prisma/client/runtime/client.mjs');
if (fs.existsSync(runtimeMjsPath)) {
  let runtimeContent = fs.readFileSync(runtimeMjsPath, 'utf8');
  
  // Check if already patched
  if (!runtimeContent.includes('// Patched for Cloudflare Workers compatibility')) {
    // Find and replace the problematic code
    // The runtime uses minified variable names like __banner_node_url
    const oldCode = `const __filename = __banner_node_url.fileURLToPath(import.meta.url);
globalThis['__dirname'] = __banner_node_path.dirname(__filename);`;
    const newCode = `// Patched for Cloudflare Workers compatibility
// Check if we're in a browser/worker environment where import.meta.url may be undefined
const getDirname = (url) => {
  if (url) {
    try {
      return __banner_node_path.dirname(__banner_node_url.fileURLToPath(url));
    } catch {
      return "/";
    }
  }
  return "/";
};
const __dirname = getDirname(typeof import.meta !== "undefined" ? import.meta.url : undefined);
globalThis['__dirname'] = __dirname;`;
    
    if (runtimeContent.includes(oldCode)) {
      runtimeContent = runtimeContent.replace(oldCode, newCode);
      fs.writeFileSync(runtimeMjsPath, runtimeContent, 'utf8');
      console.log(`✓ Patched ${runtimeMjsPath}`);
    } else {
      console.log(`✓ ${runtimeMjsPath} already patched or different structure`);
    }
  } else {
    console.log(`✓ ${runtimeMjsPath} already patched`);
  }
}

console.log('✓ Prisma patching complete!');

