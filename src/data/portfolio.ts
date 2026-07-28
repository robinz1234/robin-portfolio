export const personalInfo = {
  name: "Tajwar Al Haque Robin",
  shortName: "Robin",
  role: "Full Stack Developer and Software Engineer",
  secondaryRole: "Data and AI Enthusiast",
  email: "robintajwar1234@gmail.com",
  phone: "+8801761972956",
  location: "Dhaka, Bangladesh",
  github: "https://github.com/robinz1234",
  linkedin: "https://linkedin.com/in/tajwar-al-haque-robin",
  resumePath: "/resume/Tajwar_Al_Haque_Robin_Resume.pdf",
  introduction:
    "I build production-ready web applications, business systems, data workflows, and AI-powered software solutions.",
  summary: [
    "Computer Science graduate with more than two years of combined professional and project experience in software development, web application engineering, data processing, and machine learning.",
    "Experienced in responsive frontend development, backend integration, REST APIs, databases, deployment, automation, debugging, and business-focused technical solutions.",
    "I enjoy transforming complex requirements into practical, maintainable, and user-friendly software.",
  ],
};

export const navigationItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Experience",
    href: "#experience",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const statistics = [
  {
    value: "2+",
    label: "Years of experience",
  },
  {
    value: "5",
    label: "Featured projects",
  },
  {
    value: "3",
    label: "Professional roles",
  },
  {
    value: "20+",
    label: "Technologies used",
  },
];

export const education = [
  {
    qualification: "Bachelor of Science in Computer Science and Engineering",
    institution: "BRAC University",
    period: "2021 - 2025",
  },
  {
    qualification: "A Levels",
    institution: "Mastermind English Medium School",
    period: "2020",
  },
  {
    qualification: "O Levels",
    institution: "Mastermind English Medium School",
    period: "2018",
  },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    id: "timenowit",
    role: "Full Stack Developer",
    company: "TimenowIT",
    period: "June 2025 - February 2026",
    location: "Dhaka, Bangladesh",
    description:
      "Developed and maintained responsive, production-ready web applications with frontend, backend, API, and deployment responsibilities.",
    achievements: [
      "Developed responsive and mobile-friendly client-facing web applications.",
      "Integrated REST APIs and backend services for dynamic content and user interactions.",
      "Supported deployment, environment configuration, debugging, and production issue resolution.",
      "Used Git-based workflows for structured development and collaboration.",
    ],
    technologies: ["React", "JavaScript", "REST APIs", "Git", "Responsive Design"],
  },
  {
    id: "hubfluence",
    role: "Web Developer",
    company: "Hubfluence Digital",
    period: "January 2026 - March 2026",
    location: "Remote",
    description:
      "Built and deployed a company website using Vue 3, Vite, Strapi, REST APIs, and database-backed contact workflows.",
    achievements: [
      "Created reusable Vue components and responsive interfaces.",
      "Integrated Strapi REST API endpoints and a database-backed contact form.",
      "Configured CORS, production environment variables, and Render deployment settings.",
      "Diagnosed and resolved frontend and backend deployment issues.",
    ],
    technologies: ["Vue 3", "Vite", "Strapi", "PostgreSQL", "Render", "REST APIs"],
  },
  {
    id: "cleverlyy",
    role: "Junior Data Engineer",
    company: "Cleverlyy",
    period: "March 2024 - April 2025",
    location: "Dhaka, Bangladesh",
    description:
      "Automated reporting processes, performed data preparation, and created analytical reports and dashboards.",
    achievements: [
      "Reduced recurring manual reporting effort by approximately 30 percent.",
      "Performed data quality checking, cleansing, and preprocessing.",
      "Created weekly and ad-hoc reports for operational decision-making.",
      "Worked with Python, SQL, Excel, Pandas, and NumPy.",
    ],
    technologies: ["Python", "SQL", "Pandas", "NumPy", "Excel", "Power BI"],
  },
];

export type ProjectCategory =
  | "Full Stack"
  | "Business Systems"
  | "Artificial Intelligence"
  | "Machine Learning"
  | "Data Engineering";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  achievements: string[];
  technologies: string[];

  /*
   * Put the exact public GitHub repository URL here.
   * Leave it empty if the code is not public yet.
   */
  githubUrl: string;

  /*
   * Put the Vercel, Render, Netlify, Streamlit,
   * or other deployed application URL here.
   * Leave it empty if there is no live demo.
   */
  liveUrl: string;
};

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Full Stack",
  "Business Systems",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Engineering",
];

export const projects: Project[] = [
  {
    id: "odoo-fund-management",
    title: "Odoo Fund Management System",
    category: "Business Systems",
    summary:
      "A custom enterprise fund management module covering fund receipt, allocation, requisition, billing, transfer, approval, and audit processes.",
    achievements: [
      "Implemented GM and MD approval workflows.",
      "Added balance validation and server-side financial controls.",
      "Prevented double allocation, over-billing, and double spending.",
      "Implemented access rights, record rules, audit logs, and dashboard controls.",
    ],
    technologies: ["Odoo 18", "Python", "PostgreSQL", "Docker", "XML", "Git"],

    /*
     * Replace the empty value with the real repository URL.
     * Example:
     * "https://github.com/robinz1234/odoo-fund-management"
     */
    githubUrl: "https://github.com/robinz1234/nn_fund_management",

    /*
     * Add a live demo URL only when one exists.
     */
    liveUrl: "",
  },
  {
    id: "ai-surveillance",
    title: "AI Security and Surveillance System",
    category: "Artificial Intelligence",
    summary:
      "A full-stack surveillance platform for real-time detection, recognition, restricted-zone monitoring, and automated alerts.",
    achievements: [
      "Implemented real-time face detection and recognition.",
      "Added person re-identification and restricted-zone monitoring.",
      "Integrated automated email alert workflows.",
      "Connected the React frontend, FastAPI backend, MongoDB, and computer vision models.",
    ],
    technologies: ["Python", "FastAPI", "React", "MongoDB", "YOLOv11", "OpenCV"],
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "hubfluence-digital",
    title: "Hubfluence Digital Website",
    category: "Full Stack",
    summary:
      "A responsive corporate website with reusable frontend components, CMS integration, database-backed forms, and cloud deployment.",
    achievements: [
      "Built the frontend using Vue 3 and Vite.",
      "Integrated Strapi REST API endpoints.",
      "Connected a PostgreSQL-backed customer contact workflow.",
      "Configured CORS, environment variables, and Render deployment.",
    ],
    technologies: ["Vue 3", "Vite", "Strapi", "PostgreSQL", "Render"],

    /*
     * You may use the frontend repository here.
     * A second backend link can be added later.
     */
    githubUrl: "https://github.com/robinz1234/hubfluence-digital",
    liveUrl: "https://www.hubfluencedigital.com/",
  },
  {8
    id: "cardiovascular-prediction",
    title: "Cardiovascular Disease Prediction",
    category: "Machine Learning",
    summary:
      "A supervised machine-learning pipeline for predicting cardiovascular disease risk from clinical indicators.",
    achievements: [
      "Performed data preprocessing and feature engineering.",
      "Trained and compared supervised-learning models.",
      "Applied hyperparameter tuning and model evaluation.",
      "Achieved approximately 87 percent accuracy.",
    ],
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "flight-delay-prediction",
    title: "Flight Delay Prediction System",
    category: "Data Engineering",
    summary:
      "An aviation data analysis and prediction project with machine-learning models and reporting dashboards.",
    achievements: [
      "Processed and analyzed aviation datasets.",
      "Identified operational factors associated with delays.",
      "Created predictive models and Power BI reports.",
      "Achieved approximately 82 percent validation accuracy.",
    ],
    technologies: ["Python", "SQL", "Pandas", "Power BI", "Machine Learning"],
    githubUrl: "",
    liveUrl: "",
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "Java", "C++", "C"],
  },
  {
    title: "Frontend Development",
    skills: [
      "React.js",
      "Next.js",
      "Vue.js",
      "React Native",
      "Vite",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "FastAPI", "Strapi", "REST APIs", "API Integration"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "Data and Machine Learning",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "Data Preprocessing",
      "Model Evaluation",
    ],
  },
  {
    title: "Tools and Deployment",
    skills: ["Git", "GitHub", "Docker", "Render", "Postman", "Cloud Deployment"],
  },
];

export const certifications = [
  "Generative AI Fundamentals, IBM",
  "Machine Learning with Python, IBM",
  "SQL for Data Science, University of California, Davis",
  "Full-Stack Web Development, Programming Hero",
];
