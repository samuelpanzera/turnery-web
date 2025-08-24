"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function OrcamentSectionClientWrapper({ children, ...props }: Props) {

  const sectionRef = useIntersectionObserver<HTMLElement>({
    threshold: 0.2,
    rootMargin: "-50px 0px",
    onIntersect: (isIntersecting) => {
      if (isIntersecting) {
        window.dispatchEvent(
          new CustomEvent("orcamentoInView", { detail: true })
        );
      }
    },
  });

  return (
    <section ref={sectionRef} {...props}>
      {children}
    </section>
  );
}