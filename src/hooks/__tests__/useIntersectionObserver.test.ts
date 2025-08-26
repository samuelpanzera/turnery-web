import { describe, it, expect, beforeEach, jest, afterEach } from "bun:test";

import { renderHook } from "@testing-library/react";
import { useIntersectionObserver } from "../useIntersectionObserver";

const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  const mockIntersectionObserver = jest
    .fn()
    .mockImplementation((callback: IntersectionObserverCallback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      callback,
    }));

  global.IntersectionObserver =
    mockIntersectionObserver as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useIntersectionObserver", () => {
  it("should create an IntersectionObserver with default options", () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    expect(result.current).toBeDefined();
  });

  it("should create an IntersectionObserver with custom options", () => {
    const onIntersect = jest.fn();
    const options = {
      threshold: 0.5,
      rootMargin: "-50px 0px",
      onIntersect,
    };

    renderHook(() => useIntersectionObserver(options));

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: "-50px 0px",
      }
    );
  });

  it("should call onIntersect when intersection changes", () => {
    const onIntersect = jest.fn();
    let observerCallback: IntersectionObserverCallback;

    const mockIntersectionObserver = jest
      .fn()
      .mockImplementation((callback: IntersectionObserverCallback) => {
        observerCallback = callback;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: mockDisconnect,
        };
      });

    global.IntersectionObserver =
      mockIntersectionObserver as unknown as typeof IntersectionObserver;

    renderHook(() => useIntersectionObserver({ onIntersect }));

    const mockEntry = { isIntersecting: true } as IntersectionObserverEntry;
    const mockObserver = {} as IntersectionObserver;
    observerCallback!([mockEntry], mockObserver);

    expect(onIntersect).toHaveBeenCalledWith(true);
  });

  it("should observe element when ref is set", () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const mockElement = document.createElement("div");

    Object.defineProperty(result.current, "current", {
      value: mockElement,
      writable: true,
    });

    renderHook(() => useIntersectionObserver());

    expect(mockObserve).toHaveBeenCalledWith(mockElement);
  });
});
