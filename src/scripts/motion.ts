import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const motion = gsap.matchMedia();

motion.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.defaults({ ease: "expo.out" });

  const intro = gsap.timeline({ defaults: { overwrite: "auto" } });

  intro
    .fromTo(
      ".hero-top",
      { autoAlpha: 0, y: 8, filter: "blur(8px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        clearProps: "filter",
      },
    )
    .fromTo(
      ".hero h1",
      {
        autoAlpha: 0,
        y: 28,
        scale: 0.985,
        filter: "blur(12px)",
        transformOrigin: "50% 60%",
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
        clearProps: "filter",
      },
      "-=0.72",
    )
    .fromTo(
      ".hero-bottom",
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 1.05 },
      "-=0.82",
    )
    .fromTo(
      ".scroll",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.9 },
      "-=0.72",
    );

  gsap.to(".hero-title", {
    yPercent: -3,
    scale: 0.99,
    opacity: 0.82,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.4,
    },
  });

  gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
    const frame = card.querySelector<HTMLElement>(".project-image");
    const image = card.querySelector<HTMLImageElement>(".project-image img");
    const info = card.querySelector<HTMLElement>(".project-info");

    if (frame) {
      gsap.fromTo(
        frame,
        {
          autoAlpha: 0,
          y: 22,
          scale: 0.985,
          filter: "blur(10px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.25,
          clearProps: "filter",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            once: true,
          },
        },
      );
    }

    if (info) {
      gsap.fromTo(
        info,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay: 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        },
      );
    }

    if (image) {
      gsap.fromTo(
        image,
        { yPercent: -1.5, scale: 1.035 },
        {
          yPercent: 1.5,
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: frame ?? card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );
    }
  });

  const revealSelectors = [
    ".section-header > div:first-child",
    ".section-intro",
    ".section-label",
    ".experience-title",
    ".about-top",
    ".about-title",
    ".about-info",
    ".tools-header",
    ".contact-heading",
  ];

  gsap.utils.toArray<HTMLElement>(revealSelectors.join(",")).forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 22, filter: "blur(8px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        clearProps: "filter",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      },
    );
  });

  ScrollTrigger.batch(".experience-item", {
    start: "top 88%",
    once: true,
    onEnter: (items) =>
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.06,
        },
      ),
  });

  ScrollTrigger.batch(".stat", {
    start: "top 90%",
    once: true,
    onEnter: (items) =>
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.045,
        },
      ),
  });

  ScrollTrigger.batch(".tool", {
    start: "top 92%",
    once: true,
    onEnter: (items) =>
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.035,
        },
      ),
  });

  gsap.to(".about-title", {
    yPercent: -2.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".about",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.6,
    },
  });

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });

  return () => window.removeEventListener("load", refresh);
});
