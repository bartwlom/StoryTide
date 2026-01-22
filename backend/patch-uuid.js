// Patch script to fix uuid package and Prisma Runtime for Cloudflare Workers
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function patchPrismaClient() {
  const prismaClientPath = join(__dirname, 'generated', 'prisma', 'client.ts');

  if (!fs.existsSync(prismaClientPath)) {
    console.log('⚠️  Prisma client not found at:', prismaClientPath);
    return false;
  }

  let content = fs.readFileSync(prismaClientPath, 'utf8');

  const newCode = `// Patched for Cloudflare Workers compatibility
const getDirname = (url: string | undefined): string => {
  if (url) {
    try {
      return path.dirname(fileURLToPath(url));
    } catch {
      return "/";
    }
  }
  return "/";
};
globalThis["__dirname"] = getDirname(typeof import.meta !== "undefined" ? import.meta.url : undefined);`;

  const oldCode = `if (typeof import.meta !== "undefined" && import.meta.url) { globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url)); } else { globalThis["__dirname"] = "/"; }`;
  const v2Target = `globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))`;

  let patched = false;

  // Apply patches if needed
  if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    patched = true;
  } else if (content.includes(v2Target)) {
    content = content.replace(v2Target, newCode);
    patched = true;
  } else if (content.includes('globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url))')) {
    content = content.replace('globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url))', newCode);
    patched = true;
  }

  if (patched) {
    fs.writeFileSync(prismaClientPath, content, 'utf8');
    console.log('✅ Patched Prisma client for Cloudflare Workers:', prismaClientPath);
    return true;
  }

  return false;
}

function findAndPatchUuidFiles() {
  const rootDir = join(__dirname, '..');
  const backendDir = __dirname;
  const searchPaths = [join(rootDir, 'node_modules'), join(backendDir, 'node_modules')];

  let patchedCount = 0;
  for (const basePath of searchPaths) {
    if (!fs.existsSync(basePath)) continue;
    const uuidPath = join(basePath, 'uuid', 'dist', 'esm', 'native.js');
    if (fs.existsSync(uuidPath)) {
      try {
        let content = fs.readFileSync(uuidPath, 'utf8');
        if (content.includes('import.meta.url') && !content.includes('typeof import.meta')) {
          content = content.replace(/import\.meta\.url/g, '(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///")');
          fs.writeFileSync(uuidPath, content, 'utf8');
          console.log(`✅ Patched UUID: ${uuidPath}`);
          patchedCount++;
        }
      } catch (e) { }
    }
  }
}

function patchPrismaRuntime() {
  const rootDir = join(__dirname, '..');
  const searchPaths = [
    join(rootDir, 'node_modules', '@prisma', 'client', 'runtime', 'client.mjs'),
    join(rootDir, 'node_modules', '@prisma', 'client', 'runtime', 'client.js'),
    join(__dirname, 'node_modules', '@prisma', 'client', 'runtime', 'client.mjs'),
    join(__dirname, 'node_modules', '@prisma', 'client', 'runtime', 'client.js')
  ];

  for (const filePath of searchPaths) {
    if (!fs.existsSync(filePath)) continue;

    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Patch .fileURLToPath(import.meta.url)
      if (content.includes('fileURLToPath(import.meta.url)') && !content.includes('fileURLToPath(typeof import.meta')) {
        content = content.replace(
          /fileURLToPath\(import\.meta\.url\)/g,
          'fileURLToPath(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///unknown")'
        );
      }

      // Patch .createRequire(import.meta.url)
      if (content.includes('createRequire(import.meta.url)') && !content.includes('createRequire(typeof import.meta')) {
        content = content.replace(
          /createRequire\(import\.meta\.url\)/g,
          'createRequire(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///unknown")'
        );
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Patched Prisma runtime: ${filePath}`);
      } else {
        // Double check validation - if file contains unpatched string but we didn't patch, logic is wrong
        if (content.includes('createRequire(import.meta.url)')) {
          console.log(`⚠️  Warning: createRequire(import.meta.url) found but not patched in ${filePath}`);
        }
      }
    } catch (e) {
      console.log(`⚠️ Failed to patch ${filePath}:`, e.message);
    }
  }
}

// Run patches
patchPrismaClient();
findAndPatchUuidFiles();
patchPrismaRuntime();
