import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiExpress,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiPython,
  SiSocketdotio,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import {
  FaDatabase,
  FaMobileScreenButton,
  FaSitemap,
  FaCubes,
  FaPuzzlePiece,
  FaLayerGroup,
  FaUsers,
  FaNetworkWired,
  FaBriefcase,
  FaCalendar,
  FaUserTie,
  FaCode,
  FaCircleCheck,
  FaStar,
  FaArrowRight,
  FaClock,
} from 'react-icons/fa6'

// Maps a data-driven icon key to its rendered react-icons component.
export const ICONS = {
  react: SiReact,
  node: SiNodedotjs,
  mongodb: SiMongodb,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss,
  bootstrap: SiBootstrap,
  express: SiExpress,
  git: SiGit,
  github: SiGithub,
  postman: SiPostman,
  vercel: SiVercel,
  vscode: VscVscode,
  python: SiPython,
  socketio: SiSocketdotio,
  api: FaNetworkWired,
  database: FaDatabase,
  device: FaMobileScreenButton,
  dsa: FaSitemap,
  oop: FaCubes,
  puzzle: FaPuzzlePiece,
  layers: FaLayerGroup,
  users: FaUsers,
}

export function TechIcon({ name, ...props }) {
  const Cmp = ICONS[name]
  if (!Cmp) return null
  return <Cmp {...props} />
}
