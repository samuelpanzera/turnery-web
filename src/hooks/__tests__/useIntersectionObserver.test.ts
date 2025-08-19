import { renderHook } from "@testing-library/react";
import { useIntersectionObserver } from "../useIntersectionObserver";

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();

beforeEach(() => {
  mockIntersectionObserver.mockImplementation((callback) => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: jest.fn(),
    callback,
  }));

  global.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useIntersectionObserver", () => {
  it("should create an IntersectionObserver with default options", () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
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

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: "-50px 0px",
      }
    );
  });

  it("should call onIntersect when intersection changes", () => {
    const onIntersect = jest.fn();
    let observerCallback: (entries: IntersectionObserverEntry[]) => void;

    mockIntersectionObserver.mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: jest.fn(),
      };
    });

    renderHook(() => useIntersectionObserver({ onIntersect }));

    // Simulate intersection
    const mockEntry = { isIntersecting: true } as IntersectionObserverEntry;
    observerCallback!([mockEntry]);

    expect(onIntersect).toHaveBeenCalledWith(true);
  });

  it("should observe element when ref is set", () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const mockElement = document.createElement("div");

    // Simulate setting the ref
    Object.defineProperty(result.current, "current", {
      value: mockElement,
      writable: true,
    });

    // Re-render to trigger useEffect
    renderHook(() => useIntersectionObserver());

    expect(mockObserve).toHaveBeenCalledWith(mockElement);
  });
});
