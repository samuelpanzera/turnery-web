/// <reference types="bun-types" />

declare global {
  namespace NodeJS {
    interface Global {
      window: Window & typeof globalThis;
      document: Document;
      navigator: Navigator;
      HTMLElement: typeof HTMLElement;
      Element: typeof Element;
      Node: typeof Node;
    }
  }
}

export {};
