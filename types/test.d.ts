declare global {
  // Bun test globals
  var describe: (name: string, fn: () => void) => void;
  var it: (name: string, fn: () => void) => void;
  var test: (name: string, fn: () => void) => void;
  var beforeEach: (fn: () => void) => void;
  var afterEach: (fn: () => void) => void;
  var beforeAll: (fn: () => void) => void;
  var afterAll: (fn: () => void) => void;
}
