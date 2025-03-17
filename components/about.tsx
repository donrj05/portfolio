"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am a Computer Science postgraduate from <span className="font-medium">Stevens Institute of Technology, Hoboken</span>{" "}
        Although I have had lot of exposure to Data Science and Machine Learning technologies, any field in IT or even anything remotely
        related to engineering interests me. God has programmed me for BFS, therefore there are but few matters in all the world that can render me indifferent.{" "}
        Currently my imagination is captured by{" "}
        <span className="font-medium">full-stack web development</span>.{" "}
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy reading
        books, watching action/war movies, and playing any team sport. I also enjoy{" "}
        <span className="font-medium">reading poems and couplets</span>. 
        In sooth, I hold a deep and abiding affection for the fine arts and the pursuit of fresh knowledge.{" "}
        <span className="font-medium"></span>
      </p>
    </motion.section>
  );
}
