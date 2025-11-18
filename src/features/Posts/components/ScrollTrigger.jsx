import { useEffect, useRef } from "react";

function ScrollTrigger({ onReach }) {
  const triggerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onReach();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, [onReach]);

  return (
    <div
      ref={triggerRef}
      style={{ height: "1px", width: "100%", visibility: "hidden" }}
    />
  );
}

export default ScrollTrigger;
