// Central data store for the portfolio.

export const PROFILE = {
  name: 'Deepak Arya',
  initials: 'DA',
  roles: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'AI & ML Student',
    'Problem Solver',
  ],
  description:
    'Passionate Full Stack Developer with experience building modern web applications using React.js, Node.js, Express.js and MongoDB. Currently pursuing B.Tech in Artificial Intelligence & Machine Learning while developing real-world projects and continuously improving development skills.',
  email: 'deepakarya20112000@gmail.com',
  location: 'Lucknow, Uttar Pradesh, India',
  resumeUrl: '/Resume/deepak-arya.pdf',
  avatar: '/Profile/profile.webp',
  logo: '/Navbar logo/navbar logo.webp',
}

export const SOCIAL_LINKS = {
  github: 'https://github.com/deepakarya2011',
  linkedin: 'https://www.linkedin.com/in/deepak-arya-860881276/',
  portfolio: 'https://aboutarya.vercel.app/',
}

export const GITHUB_USERNAME = 'deepakarya2011'

// Desktop nav — primary links only
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// Hamburger menu — secondary links
export const HAMBURGER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
]

export const HERO_TECH_ICONS = [
  'react',
  'node',
  'mongodb',
  'javascript',
  'git',
  'github',
]

export const HIGHLIGHTS = [
  { title: 'Full Stack Development', icon: 'layers' },
  { title: 'REST API Development', icon: 'api' },
  { title: 'Database Design', icon: 'database' },
  { title: 'Responsive UI Design', icon: 'device' },
  { title: 'Problem Solving', icon: 'puzzle' },
  { title: 'Team Collaboration', icon: 'users' },
]

export const SKILL_GROUPS = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'react' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'Responsive Design', icon: 'device' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Mongoose', icon: 'database' },
      { name: 'MongoDB Atlas', icon: 'database' },
      { name: 'SQL', icon: 'database' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'VS Code', icon: 'vscode' },
    ],
  },
  {
    category: 'Other',
    skills: [
      { name: 'Data Structures', icon: 'dsa' },
      { name: 'OOP Concepts', icon: 'oop' },
      { name: 'API Integration', icon: 'api' },
      { name: 'Problem Solving', icon: 'puzzle' },
    ],
  },
]

// Projects ordered: strongest first
export const PROJECTS = [
  {
    id: 'chat-app',
    title: 'FlixerChat — Real-Time Chat App',
    description:
      'A modern real-time chat platform with JWT authentication, Socket.IO messaging, responsive UI, and a seamless communication experience built on the full MERN stack.',
    tech: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB'],
    github: 'https://github.com/deepakarya2011',
    demo: 'https://flixerchat.vercel.app/',
    accent: '#6366F1',
    thumbnail: '/Project thumbnails/Real-Time Chat Application.webp',
  },
  {
    id: 'careerconnect',
    title: 'CareerConnect Job Portal',
    description:
      'A full-stack job portal platform where users can browse job listings, search jobs by location and role, and view detailed job information. Backend APIs developed using Node.js and Express with MongoDB integration.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/deepakarya2011',
    demo: 'https://careerconnectfrontend.vercel.app/',
    accent: '#06B6D4',
    thumbnail: '/Project thumbnails/CareerConnect Job Portal.webp',
  },
  {
    id: 'taskflow',
    title: 'TaskFlow Manager',
    description:
      'A task management application allowing users to create, update, delete, and manage tasks with an intuitive user experience and backend data storage.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/deepakarya2011',
    demo: 'https://aryatodolist.vercel.app/',
    accent: '#A855F7',
    thumbnail: '/Project thumbnails/TaskFlow Manager.webp',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker Pro',
    description:
      'A modern expense tracking application for managing income and expenses with secure CRUD operations and an analytics dashboard.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/deepakarya2011',
    demo: 'https://expense-tracker-app-ruddy-ten.vercel.app/',
    accent: '#6366F1',
    thumbnail: '/Project thumbnails/Expense Tracker Pro.webp',
  },
  {
    id: 'ai-text-utility',
    title: 'AI Text Utility Tool',
    description:
      'A productivity web application providing text transformation, formatting, case conversion, word counting, and text analysis features.',
    tech: ['React.js', 'JavaScript', 'CSS'],
    github: 'https://github.com/deepakarya2011',
    demo: '#',
    accent: '#06B6D4',
    thumbnail: '/Project thumbnails/AI Text Utility Tool.webp',
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description:
      'A tool that generates QR codes instantly from user input with download functionality and a clean user interface.',
    tech: ['Python', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/deepakarya2011',
    demo: '#',
    accent: '#A855F7',
    thumbnail: '/Project thumbnails/QR Code Generator.webp',
  },
]

export const EDUCATION = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Artificial Intelligence & Machine Learning',
    school: "Dr. A.P.J Abdul Kalam Technical University (AKTU)",
    period: 'Expected Graduation: 2026',
    description:
      'Focused on building strong fundamentals in AI/ML, data structures, algorithms and software engineering while shipping real-world full-stack projects.',
  },
  {
    degree: 'Higher Secondary Education (XII)',
    field: 'Science (PCM)',
    school: 'Uttar Pradesh Board',
    period: 'Completed',
    description:
      'Built a strong foundation in mathematics and computer fundamentals that sparked an interest in programming and software development.',
  },
]

export const CERTIFICATES = [
  { title: 'Full Stack Web Development', issuer: 'Self-Paced Program', year: '2024' },
  { title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp', year: '2023' },
  { title: 'MongoDB Basics', issuer: 'MongoDB University', year: '2024' },
  { title: 'React.js Essentials', issuer: 'Online Certification', year: '2024' },
  { title: 'Git & GitHub Mastery', issuer: 'Online Certification', year: '2023' },
  { title: 'Problem Solving (Basic)', issuer: 'HackerRank', year: '2023' },
]

// EmailJS configuration
export const EMAILJS_CONFIG = {
  serviceId: 'service_6px5ygm',
  templateId: 'template_ymvr4h4',
  publicKey: 'Qm4V52W9QS9CWq8TP',
}

export const EXPERIENCE = [
  {
    id: 'mr-rishi-cms',
    role: 'Freelance Full Stack Developer',
    company: 'Mr.Rishi (YouTube Creator)',
    duration: 'May 2026 – June 2026',
    employmentType: 'Freelance / Contract',
    status: 'Completed',
    statusIcon: '✔',
    description:
      'Worked directly with YouTube creator Mr.Rishi to design and develop a custom MERN Stack Content Management System (CMS) that streamlines the complete YouTube content production workflow. The platform helps manage video ideas, script writing, production progress, SEO planning, scheduling, and publishing from a single dashboard.',
    responsibilities: [
      'Gathered client requirements and converted them into a production-ready web application.',
      'Designed and developed the complete frontend using React.js with a modern responsive UI.',
      'Built scalable backend APIs using Node.js and Express.js.',
      'Integrated MongoDB for secure and efficient data storage.',
      'Implemented JWT Authentication with protected routes.',
      'Developed a powerful Script Editor for writing and managing YouTube scripts.',
      'Created a Content Planner to organize upcoming videos.',
      'Built an end-to-end Video Workflow system: Idea → Script → Recording → Editing → SEO → Scheduled → Published',
      'Added SEO Management including Title, Description, Tags, and Keywords.',
      'Implemented Search, Filters, Labels, Categories, and Status Tracking.',
      'Designed a fully responsive interface supporting Desktop, Tablet, and Mobile devices.',
      'Added Dark Mode with smooth animations and modern user experience.',
    ],
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT Authentication',
      'REST APIs',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Git',
      'GitHub',
    ],
    highlights: [
      'Real Client Project',
      'MERN Stack',
      'Full Stack Development',
      'Responsive Design',
      'Authentication System',
      'Content Management System',
      'REST APIs',
      'SEO Dashboard',
      'Script Editor',
      'Content Planner',
      'Workflow Management',
    ],
    metrics: [
      { label: 'Real Client', value: 1, suffix: '' },
      { label: 'Days Development', value: 26, suffix: '' },
      { label: 'Major Features', value: 10, suffix: '+' },
      { label: 'Responsive', value: 100, suffix: '%' },
      { label: 'Full Stack MERN', value: 1, suffix: '' },
    ],
  },
]
