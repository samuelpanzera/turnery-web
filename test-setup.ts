import { Window } from "happy-dom";
import { expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Bun's expect with jest-dom matchers
expect.extend(matchers);

// Setup DOM environment for tests
const window = new Window({
  url: "http://localhost:3000",
  width: 1024,
  height: 768,
});

global.window = window as any;
global.document = window.document as any;
global.navigator = window.navigator as any;
global.HTMLElement = window.HTMLElement as any;
global.Element = window.Element as any;
global.Node = window.Node as any;
