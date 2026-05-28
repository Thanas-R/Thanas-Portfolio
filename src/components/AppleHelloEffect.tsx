"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { AppleHelloEffectEnglish } from "@/components/apple-hello-effect/apple-hello-effect-english";
import { AppleHelloEffectHindi } from "@/components/apple-hello-effect/apple-hello-effect-hindi";
import { AppleHelloEffectSpanish } from "@/components/apple-hello-effect/apple-hello-effect-spanish";

type Props = { className?: string; speed?: number };

function AppleHelloEffect({ className, speed = 1 }: Props) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % 3);

  // Same height across languages so size stays consistent.
  const sharedClass = className ?? "h-20";

  const demos = [
    <AppleHelloEffectEnglish
      key="english"
      className={sharedClass}
      durationScale={speed}
      onAnimationComplete={next}
    />,
    <AppleHelloEffectHindi
      key="hindi"
      className={sharedClass}
      durationScale={0.8 * speed}
      onAnimationComplete={next}
    />,
    <AppleHelloEffectSpanish
      key="spanish"
      className={sharedClass}
      durationScale={0.8 * speed}
      onAnimationComplete={next}
    />,
  ];

  return <AnimatePresence mode="wait">{demos[index]}</AnimatePresence>;
}

export { AppleHelloEffect };
