import {
  MapPin,
  Mail,
  Globe,
  Code2,
  Server,
  Cloud,
  Database,
  Wrench,
  Sparkles,
  Briefcase,
  GraduationCap,
  Heart,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';

const techStack = [
  {
    category: '前端开发',
    icon: Code2,
    color: 'bg-blue-500',
    items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3', 'PWA'],
  },
  {
    category: '后端开发',
    icon: Server,
    color: 'bg-green-500',
    items: ['Node.js', 'Express', 'Python', 'WebSocket', 'REST API'],
  },
  {
    category: '云服务',
    icon: Cloud,
    color: 'bg-orange-500',
    items: ['Cloudflare Pages', 'Cloudflare Workers', 'Cloudflare KV', 'Cloudflare D1', '腾讯云 EdgeOne', '腾讯云 COS'],
  },
  {
    category: '数据库',
    icon: Database,
    color: 'bg-purple-500',
    items: ['SQLite', 'Cloudflare D1', 'Cloudflare KV'],
  },
  {
    category: 'DevOps & 工具',
    icon: Wrench,
    color: 'bg-cyan-500',
    items: ['Docker', 'GitHub Actions', 'GHCR', 'Git', 'DrissionPage'],
  },
  {
    category: '其他',
    icon: Sparkles,
    color: 'bg-pink-500',
    items: ['Web3Forms', '浏览器自动化', '多语言国际化', '响应式设计'],
  },
];

const experiences = [
  {
    title: 'Full-stack Developer',
    period: '2024 - 至今',
    description: '专注于边缘计算和全栈 Web 开发，使用 Cloudflare 生态构建高性能应用。',
  },
  {
    title: 'CMSC 大学网站项目',
    period: '2026',
    description: '主导开发多语言大学官网，支持中/吉/俄/英四种语言，部署于 Cloudflare Pages。',
  },
  {
    title: '开源贡献者',
    period: '持续',
    description: '活跃于 GitHub 开源社区，参与多个自动化工具和 Web 项目的开发。',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <section className="animate-fade-in-up mb-12">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-200/50 dark:border-indigo-800/50">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            你好！我是 <span className="font-semibold text-indigo-600 dark:text-indigo-400">Hyrd Setbre</span>，
            一名来自吉尔吉斯斯坦比什凯克的全栈开发者。我热衷于构建快速、可扩展的 Web 应用，
            尤其擅长利用 Cloudflare 边缘计算平台和腾讯云服务打造高性能的现代化网站。
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Bishkek, Kyrgyz Republic
            </span>
            <a
              href="https://cmsc.edu.kg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
            >
              <Globe className="w-4 h-4" /> cmsc.edu.kg
            </a>
            <a
              href="mailto:hyrdsetbre@jnos.net"
              className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
            >
              <Mail className="w-4 h-4" /> hyrdsetbre@jnos.net
            </a>
            <a
              href="https://github.com/hyrdsetbre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
            >
              <GithubIcon className="w-4 h-4" /> github.com/hyrdsetbre
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-indigo-500" />
          技术栈
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((stack) => (
            <div
              key={stack.category}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${stack.color}`}>
                  <stack.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white">{stack.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-500" />
          经历与项目
        </h2>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white">{exp.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Project */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          精选项目
        </h2>
        <a
          href="https://cmsc.edu.kg"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                CMSC Multilingual University Site
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-2xl">
                现代化多语言大学官网，支持中文、吉尔吉斯语、俄语、英语四种语言。
                基于 React + TypeScript + Vite 构建，部署于 Cloudflare Pages，
                集成 PWA、Web3Forms 联系表单、Cloudflare KV 新闻管理等功能。
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'PWA', 'i18n'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Globe className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0" />
          </div>
        </a>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">联系方式</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="mailto:hyrdsetbre@jnos.net"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
              <Mail className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">邮箱</p>
              <p className="text-sm font-medium text-slate-800 dark:text-white">hyrdsetbre@jnos.net</p>
            </div>
          </a>
          <a
            href="https://github.com/hyrdsetbre"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <GithubIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">GitHub</p>
              <p className="text-sm font-medium text-slate-800 dark:text-white">@hyrdsetbre</p>
            </div>
          </a>
          <a
            href="https://cmsc.edu.kg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
              <Globe className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">网站</p>
              <p className="text-sm font-medium text-slate-800 dark:text-white">cmsc.edu.kg</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
