import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  BookOpen,
  MapPin,
  Mail,
  Globe,
  ArrowRight,
  Activity,
  GitCommit,
  Star,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import type { GitHubUser, GitHubRepo, GitHubEvent } from '../types/github';
import { fetchUser, fetchRepos, fetchEvents, formatDate } from '../services/githubApi';
import StatCard from '../components/StatCard';
import RepoCard from '../components/RepoCard';

export default function HomePage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [userData, reposData, eventsData] = await Promise.all([
          fetchUser(),
          fetchRepos('updated', 6),
          fetchEvents(5),
        ]);
        setUser(userData);
        setRepos(reposData);
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || '无法加载用户数据'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit className="w-4 h-4 text-green-500" />;
      case 'WatchEvent':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'ForkEvent':
        return <GitCommit className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return `推送了 ${(event.payload as { commits?: unknown[] }).commits?.length || 0} 个提交到`;
      case 'WatchEvent':
        return 'Star 了仓库';
      case 'ForkEvent':
        return 'Fork 了仓库';
      case 'CreateEvent':
        return '创建了';
      case 'PullRequestEvent':
        return '处理了 Pull Request 在';
      default:
        return event.type.replace('Event', '');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="animate-fade-in-up mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 border border-indigo-200/50 dark:border-indigo-800/50">
          <div className="relative">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-white dark:ring-slate-800 shadow-xl animate-pulse-glow"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-900"></div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
              {user.name || user.login}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-3">@{user.login}</p>
            <p className="text-slate-600 dark:text-slate-300 mb-4 max-w-xl">
              {user.bio || 'Full-stack Developer | Cloudflare & Tencent Cloud Enthusiast | Open Source Contributor'}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {user.blog}
                </a>
              )}
              <a
                href={`mailto:${user.email || 'hyrdsetbre@jnos.net'}`}
                className="flex items-center gap-1 hover:text-indigo-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {user.email || 'hyrdsetbre@jnos.net'}
              </a>
            </div>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-medium hover:scale-105 transition-transform"
          >
            <GithubIcon className="w-5 h-5" />
            关注我
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard icon={BookOpen} label="公开仓库" value={user.public_repos} color="bg-indigo-500" />
        <StatCard icon={Users} label="粉丝" value={user.followers} color="bg-cyan-500" />
        <StatCard icon={UserPlus} label="关注中" value={user.following} color="bg-purple-500" />
        <StatCard icon={Star} label="Gists" value={user.public_gists} color="bg-amber-500" />
      </section>

      {/* Pinned / Recent Repos */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">最近更新的仓库</h2>
          <Link
            to="/repos"
            className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600 font-medium"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.slice(0, 6).map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">最近活动</h2>
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {getEventDescription(event)}{' '}
                  <a
                    href={`https://github.com/${event.repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-500 hover:underline"
                  >
                    {event.repo.name}
                  </a>
                </p>
                <p className="text-xs text-slate-400 mt-1">{formatDate(event.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
