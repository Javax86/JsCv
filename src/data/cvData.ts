export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Education {
  institution: string;
  studyType: string;
  area: string;
  endDate: string;
}

export interface SkillGroup {
  name: string;
  keywords: string[];
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface CVData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    summary: string;
    location: {
      region: string;
      countryCode: string;
    };
    profiles: Profile[];
  };
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
}

export const cvData: CVData = {
  basics: {
    name: "Javed Shariyar Mandal",
    label: "Computer Science Student & Aspiring Cloud Engineer",
    email: "jshariyar67895@gmail.com",
    phone: "+91 8388807147",
    summary: "Enthusiastic Computer Science undergraduate with hands-on experience building responsive modern web applications using React and contemporary design systems. Driven by scalable infrastructure, currently deepening knowledge in backend architectures, distributed systems, and modern cloud deployment patterns with the goal of engineering robust cloud solutions.",
    location: {
      region: "West Bengal",
      countryCode: "IN"
    },
    profiles: [
      {
        network: "GitHub",
        username: "Javax86",
        url: "https://github.com/Javax86"
      },
      {
        network: "LinkedIn",
        username: "javax86",
        url: "https://www.linkedin.com/in/javax86/"
      }
    ]
  },
  education: [
    {
      "institution": "Kalyani University",
      "studyType": "Bachelor of Science",
      "area": "Computer Science",
      "endDate": "2029"
    }
  ],
  skills: [
    {
      "name": "Programming & Scripting",
      "keywords": ["Java", "C++", "Rust", "Go", "Python", "JavaScript", "TypeScript", "Bash Scripting", "Google Apps Script", "SQL"]
    },
    {
      "name": "Frameworks & Runtimes",
      "keywords": ["Node.js", "React", "Next.js", "Tailwind CSS", "Bootstrap", "Pandas", "NumPy"]
    },
    {
      "name": "Databases",
      "keywords": ["PostgreSQL", "SQLite3", "Supabase"]
    },
    {
      "name": "Cloud, DevOps & Tools",
      "keywords": ["Google Cloud Platform (GCP)", "Docker", "Linux", "GitHub Actions", "Git"]
    }
  ],
  projects: [
    {
      "name": "Art Commission Platform",
      "description": "Interactive client intake portal featuring real-time pricing estimation, automated data dispatching, and dynamic slot management.",
      "highlights": [
        "Architected an interactive quote calculator providing real-time bill estimations based on user-selected art specifications and add-ons.",
        "Engineered an automated intake pipeline using Google Apps Script to synchronize commission submissions directly with Google Forms and Sheets.",
        "Implemented dynamic inventory tracking that monitors and updates available commission slots live to prevent overbooking.",
        "Configured continuous integration and deployment pipelines using GitHub Actions for seamless static site delivery."
      ],
      "keywords": ["React", "TypeScript", "CSS", "Google Apps Script", "GitHub Actions"]
    },
    {
      "name": "Adaptive Study Tracker",
      "description": "Productivity dashboard that synchronizes academic schedules, tracks session completion, and maintains daily study momentum.",
      "highlights": [
        "Integrated Google Calendar workflows via Google Apps Script to dynamically fetch, parse, and render upcoming study blocks in real time.",
        "Developed a distraction-free focus mode with dynamic motivational messaging to enhance deep-work retention.",
        "Built responsive visual progress indicators to monitor task completion rates and maintain daily study streaks."
      ],
      "keywords": ["JavaScript", "HTML5", "CSS3", "Google Apps Script", "API Integration"]
    }
  ],
  certificates: [
    {
      "name": "Meta Front-End Developer (React Specialization)",
      "issuer": "Coursera / Meta"
    },
    {
      "name": "Go Fundamentals",
      "issuer": "ShipThatCode"
    },
    {
      "name": "SQL Advanced",
      "issuer": "ShipThatCode"
    },
    {
      "name": "SQL Intermediate",
      "issuer": "ShipThatCode"
    },
    {
      "name": "SQL Fundamentals",
      "issuer": "ShipThatCode"
    }
  ],
  languages: [
    {
      "language": "English",
      "fluency": "Full professional / bilingual proficiency"
    },
    {
      "language": "Bengali",
      "fluency": "Conversational proficiency"
    },
    {
      "language": "Hindi",
      "fluency": "Conversational proficiency"
    }
  ]
};
