import React, { useEffect,useState } from "react";
import ShowResume from "./ShowResume";
let resumeData = {
  profileDescription:
    "A highly motivated and results-driven software engineer with a strong foundation in full-stack web development. Specializing in front-end technologies like React, Vue.js, and D3.js, as well as backend technologies such as Node.js and MongoDB. With a keen eye for creating scalable, high-performance applications, I am passionate about delivering impactful solutions through clean, maintainable code. Adept at collaborating with cross-functional teams, continuously improving development workflows, and adopting the latest industry practices. I am eager to contribute my skills to developing innovative products that solve real-world challenges.",
  name: "Milan Sharma",
  email: "sharmamilan632.m@gmail.com",
  phone: "8015059351",
  address: "S.G Palya, Bangalore Karnataka, 560029",
  linkedin: "https://www.linkedin.com/in/milan-sharma-a89a3b23a/",
  github: "https://github.com/sharmamilu",

  education: [
    {
      degree: "Bachelors of Computer Application",
      institution: "Christ (Deemed to be) University",
      year: "2024",
      specialization: "Software Development",
      coursework: [
        "Node JS",
        "Data Structures and Algorithms",
        "Operating Systems",
      ],
      thesisOrResearch:
        "Built a freelancing website using the MERN stack, which included features like user authentication, live chat, and payment integration.",
      details: [
        "Graduated with Bachelors of Computer Application",
        "GPA: 3.42/4.0",
      ],
    },
  ],

  workExperience: [
    {
      company: "Simplify3x",
      role: "Software Developer Intern",
      duration: "Dec 2023 – May 2024",
      responsibilities: [
        "Built reusable Vue components for the frontend team",
        "Collaborated with backend engineers to integrate REST APIs",
        "Fixed UI bugs and implemented with best practices and new technologies",
      ],
    },
    {
      company: "Simplify3x",
      role: "Software Developer ",
      duration: "June 2024 – Present",
      responsibilities: [
        "Worked on collaborative projects with cross-functional teams",
        "Learned new technologies and frameworks like Vue.js and D3.js",
        "Participated in code reviews and provided constructive feedback",
      ],
    },
  ],

  projects: [
    {
      title: "GigHive (A freelancing website)",
      description:
        "Freelancing website using MERN stack which is created to simplify the freelancing process. It helps freelancers to find clients and clients to find freelancers in a hassle free way.",
      //   link: "https://johndoe.dev",
      technologies: [
        "React",
        "CSS",
        "Node.js",
        "MongoDB",
        "Express",
        "Bootstrap",
      ],
      role: "Developer",
      highlights: [
        "Mobile-first responsive design",
        "Used React Router for client-side routing, created a restful API with Express.js.",
        "Used Bootstrap for responsive design and styling.",
        "Collaborated with team members to implement new features and fix bugs using Git.",
      ],
    },
    {
      title: "Chat App (Socket Connected)",
      description: "Real-time chat application with user authentication.",
      technologies: ["Node.js", "Socket.IO", "MongoDB"],
      role: "Team Lead",
      highlights: [
        "JWT-based authentication",
        "Group chat with typing indicators",
        "MongoDB Atlas cloud storage",
      ],
    },
  ],

  skills: [
    { name: "React", level: "Intermediate" },
    { name: "Vue.js", level: "Advanced" },
    { name: "D3.js", level: "Intermediate" },
    { name: "JavaScript", level: "Advanced" },
    { name: "HTML/CSS", level: "Basic" },
    { name: "Node.js", level: "Intermediate" },
    { name: "SQL", level: "Basic" },
    { name: "Git", level: "Advanced" },
  ],

  languages: [
    { name: "English", level: "Professional Working Proficiency" },
    { name: "Hindi", level: "Proficient" },
    { name: "Nepali", level: "Native" },
  ],

  certifications: [
    {
      title: "Aws Cloud Foundation",
      year: "2023",
      issuer:
        "https://www.credly.com/badges/b7099ecf-7bc9-4556-befc-056edde35a67/public_url",
      description:
        "Learned the fundamentals of AWS Cloud, including EC2, S3, and RDS services.",
    },
    {
      title:
        "Software Design and Development: Software Engineering and SDLC Phases",
      year: "2023",
      issuer: "Infosys Springboard",
      description:
        "Gained understanding of Software Development Life Cycle (SDLC) and various design patterns.",
    },
    {
      title: "Web Development Concepts",
      year: "2023",
      issuer: "Infosys Springboard",
      description:
        "Explored the fundamentals of web development, including front-end technologies and RESTful APIs.",
    },
  ],

    achievements: [
      {
        title: "Dean’s List",
        year: "2020–2023",
        description: "Maintained GPA above 3.8 for six consecutive semesters."
      },
      {
        title: "Hackathon Winner",
        year: "2022",
        description: "Built a social impact app and won 1st place among 50 teams."
      }
    ],

    volunteering: [
      {
        organization: "Code for Good",
        role: "Mentor",
        year: "2023",
        description: "Mentored underrepresented students in web development basics."
      }
    ],

  interests: ["Coding", "Backend & Frontend Development", "Gaming"],
};  

const RenderResume = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("resumeData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) return <div>Loading Resume...</div>;

  return <ShowResume {...data} />;
};

export default RenderResume;
