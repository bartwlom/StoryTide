// This file patches the bundled code issue
// The uuid package uses import.meta.url which is undefined in Workers
// We'll use a workaround by setting it before Prisma loads

if (typeof globalThis !== 'undefined') {
  // Polyfill import.meta for Workers environment
  if (typeof globalThis.importMeta === 'undefined') {
    globalThis.importMeta = {
      url: 'file:///'
    };
  }
  
  // Also set it on the module if available
  if (typeof import.meta === 'undefined') {
    Object.defineProperty(globalThis, 'import', {
      value: {
        meta: {
          url: 'file:///'
        }
      },
      writable: false,
      configurable: false
    });
  }
}

