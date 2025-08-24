import { useEffect, useRef } from "react";

export interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  onIntersect?: (isIntersecting: boolean) => void;
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const elementRef = useRef<T>(null);
  const { threshold = 0.1, rootMargin = "0px", onIntersect } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (onIntersect) {
            onIntersect(entry.isIntersecting);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, onIntersect]);

  return elementRef;
}
