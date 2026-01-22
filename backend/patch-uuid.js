// Patch script to fix uuid package for Cloudflare Workers
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

  // Check if already patched
  if (content.includes('// Patched for Cloudflare Workers compatibility')) {
    console.log('✅ Prisma client already patched');
    return true;
  }

  // Patch the import.meta.url usage
  const oldCode = `if (typeof import.meta !== "undefined" && import.meta.url) { globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url)); } else { globalThis["__dirname"] = "/"; }`;
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

  if (content.includes('globalThis[\'__dirname\'] = path.dirname(fileURLToPath(import.meta.url))')) {
    content = content.replace(
      'globalThis[\'__dirname\'] = path.dirname(fileURLToPath(import.meta.url))',
      newCode
    );
    fs.writeFileSync(prismaClientPath, content, 'utf8');
    console.log('✅ Patched Prisma client for Cloudflare Workers:', prismaClientPath);
    return true;
  }

  return false;
}

function findAndPatchUuidFiles() {
  const rootDir = join(__dirname, '..');
  const backendDir = __dirname;

  // Try to find uuid files using find command
  const searchPaths = [
    join(rootDir, 'node_modules'),
    join(backendDir, 'node_modules')
  ];

  let patchedCount = 0;

  for (const basePath of searchPaths) {
    if (!fs.existsSync(basePath)) continue;

    try {
      // Use find command to locate files
      const result = execSync(
        `find "${basePath}" -path "*/uuid/dist/esm/native.js" -type f 2>/dev/null`,
        { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
      ).trim();

      if (result) {
        const files = result.split('\n').filter(f => f);

        for (const filePath of files) {
          try {
            let content = fs.readFileSync(filePath, 'utf8');

            if (content.includes('import.meta.url') && !content.includes('typeof import.meta')) {
              const originalContent = content;
              content = content.replace(
                /import\.meta\.url/g,
                '(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///")'
              );

              if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Patched: ${filePath}`);
                patchedCount++;
              }
            }
          } catch (error) {
            // Skip if can't read/write
          }
        }
      }
    } catch (error) {
      // find command failed, try manual search
      try {
        const uuidPath = join(basePath, 'uuid', 'dist', 'esm', 'native.js');
        if (fs.existsSync(uuidPath)) {
          let content = fs.readFileSync(uuidPath, 'utf8');
          if (content.includes('import.meta.url') && !content.includes('typeof import.meta')) {
            content = content.replace(
              /import\.meta\.url/g,
              '(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///")'
            );
            fs.writeFileSync(uuidPath, content, 'utf8');
            console.log(`✅ Patched: ${uuidPath}`);
            patchedCount++;
          }
        }
      } catch (e) {
        // Skip
      }
    }
  }

  if (patchedCount === 0) {
    console.log('⚠️  No uuid files found to patch. The error might be from bundled code.');
    console.log('💡 Try: npm install --force or delete node_modules and reinstall');
  } else {
    console.log(`✅ Successfully patched ${patchedCount} file(s)`);
  }
}

// Run both patches
const prismaPatched = patchPrismaClient();
findAndPatchUuidFiles();

if (!prismaPatched) {
  console.log('⚠️  Prisma client patch completed');
}

