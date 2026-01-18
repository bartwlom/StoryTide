// Direct patch for uuid package - fixes the exact file path from error
import fs from 'fs';
import { join } from 'path';

const rootDir = join(process.cwd(), '..');
const exactPath = join(rootDir, 'node_modules', 'node_modules', '.pnpm', 'uuid@11.1.0', 'node_modules', 'uuid', 'dist', 'esm', 'native.js');

console.log(`Looking for file at: ${exactPath}`);

if (fs.existsSync(exactPath)) {
  try {
    let content = fs.readFileSync(exactPath, 'utf8');
    console.log('File found! Checking for import.meta.url...');
    
    if (content.includes('import.meta.url') && !content.includes('typeof import.meta')) {
      const originalContent = content;
      content = content.replace(
        /import\.meta\.url/g,
        '(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///")'
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(exactPath, content, 'utf8');
        console.log('✅ Successfully patched uuid native.js file!');
      } else {
        console.log('File already patched or no changes needed');
      }
    } else {
      console.log('File does not contain import.meta.url or already patched');
    }
  } catch (error) {
    console.error('Error patching file:', error.message);
  }
} else {
  console.log('⚠️  File not found at exact path. Trying alternative locations...');
  
  // Try alternative search
  const altPaths = [
    join(rootDir, 'node_modules', 'uuid', 'dist', 'esm', 'native.js'),
    join(process.cwd(), 'node_modules', 'uuid', 'dist', 'esm', 'native.js'),
  ];
  
  for (const altPath of altPaths) {
    if (fs.existsSync(altPath)) {
      console.log(`Found at: ${altPath}`);
      try {
        let content = fs.readFileSync(altPath, 'utf8');
        if (content.includes('import.meta.url') && !content.includes('typeof import.meta')) {
          content = content.replace(
            /import\.meta\.url/g,
            '(typeof import.meta !== "undefined" && import.meta.url ? import.meta.url : "file:///")'
          );
          fs.writeFileSync(altPath, content, 'utf8');
          console.log('✅ Patched alternative location!');
          break;
        }
      } catch (e) {
        console.error('Error:', e.message);
      }
    }
  }
}

