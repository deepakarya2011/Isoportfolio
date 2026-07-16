// Central data store for the portfolio.
// Update links, images and copy here — components read from this file.

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
  portfolio: 'https://deepakarya.dev',
}

export const GITHUB_USERNAME = 'deepakarya2011'

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
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

export const PROJECTS = [
  {
    id: 'careerconnect',
    title: 'CareerConnect Job Portal',
    description:
      'A full-stack job portal platform where users can browse job listings, search jobs by location and role, and view detailed job information. Backend APIs developed using Node.js and Express with MongoDB integration.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/deepakarya2011',
    demo: 'https://career-connect-frontend-liard.vercel.app/',
    accent: '#6366F1',
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
    accent: '#06B6D4',
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
    accent: '#A855F7',
    thumbnail: '/Project thumbnails/Expense Tracker Pro.webp',
  },
  {
    id: 'chat-app',
    title: 'Real-Time Chat Application',
    description:
      'A modern chat platform with authentication, real-time messaging, responsive UI, and a seamless communication experience.',
    tech: ['React.js', 'Node.js', 'Socket.IO', 'MongoDB'],
    github: 'https://github.com/deepakarya2011',
    demo: 'https://flixerchat.vercel.app/',
    accent: '#6366F1',
    thumbnail: '/Project thumbnails/Real-Time Chat Application.webp',
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

export const GITHUB_STATS = [
  { label: 'Repositories', value: 20, suffix: '+' },
  { label: 'Total Commits', value: 500, suffix: '+' },
  { label: 'Contributions', value: 300, suffix: '+' },
  { label: 'Current Streak', value: 15, suffix: ' days' },
]

// EmailJS configuration — replace with your own credentials from https://www.emailjs.com
export const EMAILJS_CONFIG = {
  serviceId: 'service_et4yj5k',   // Replace with your EmailJS Service ID
  templateId: 'template_tn335v9', // Replace with your EmailJS Template ID
  publicKey: 'Qm4V52W9QS9CWq8TP',   // Replace with your EmailJS Public Key
}
