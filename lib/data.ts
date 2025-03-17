import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/citibike.jpg-2.jpg";
//import citibike from "@/public/citibike.jpg.avif";
import rmtdevImg from "@/public/reddit.jpg.jpg";
import wordanalyticsImg from "@/public/rove-e-2.jpg";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Subject Matter Expert, Computer Science",
    location: "Remote",
    description:
      "Designed solutions to wide array of problems pertaining to Computer Science like ML, AI, Algorithms, Internet Protocols etc.",
    icon: React.createElement(CgWorkAlt),
    date: "2020 - 2023",
  },
  {
    title: "Graduated Indian Institute of Information Technology",
    location: "Sri City, India",
    description:
      "I pursued Electronics and Communication Engineering and specialised with Data Science",
    icon: React.createElement(LuGraduationCap),
    date: "2022",
  },
  {
    title: "Student Ambassador",
    location: "Hoboken, NJ",
    description:
      "I represented the Schaefer School of Engineering, helping talented students gain admission to Stevens Institute of Technology.",
    icon: React.createElement(CgWorkAlt),
    date: "2024-2025",
  },
  {
    title: "Teaching Assistant",
    location: "Hoboken, NJ",
    description:
      "I am assistant professor for two courses, Deep Learning and Mathematical Foundations of ML. I assist students with course material, assignment and sometimes debug their code. Currently, I'm working on React projects.",
    icon: React.createElement(FaReact),
    date: "Jan 2025 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Citibike demand prediction",
    description:
      "Predicted citibike demand for each bike station in NYC using PySpark and MLLib",
    tags: ["Decision Trees", "Spark", "GCP", "MLLib", "SQL"],
    imageUrl: corpcommentImg,
  },
  {
    title: "Genre trends",
    description:
      "Predicting genre watching trends using scraped reddit data.",
    tags: ["Selenium", "PushShiftAPI", "Python", "Machine Learning", "NLP"],
    imageUrl: rmtdevImg,
  },
  {
    title: "NASA Rover",
    description:
      "Designed a physical rover to traverse rough terrain autonomously",
    tags: ["OpenCV", "YOLOv5", "Image-Recognition", "Mechatronics", "Physics"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "PySpark",
  "Kafka",
  "Tensorflow",
  "Keras",
  "PyTorch",
  "AWS",
  "OpenAI",
] as const;
