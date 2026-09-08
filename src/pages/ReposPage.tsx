import { useEffect, useState, useMemo } from 'react';
import { Search, ArrowUpDown, Star, GitFork, Clock } from 'lucide-react';
import type { GitHubRepo } from '../types/github';
import { fetchRepos } from '../services/githubApi';
import RepoCard from '../components/RepoCard';

type SortOption = 'updated' | 'stars' | 'name' | 'forks';

export default function ReposPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  useEffect(() => {
    async function loadRepos() {
      try {
        setLoading(true);
        const data = await fetchRepos('updated', 100);
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, []);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) langs.add(repo.language);
    });
    return Array.from(langs).sort();
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    let result = [...repos];

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          (repo.description && repo.description.toLowerCase().includes(query))
      );
    }

    // 语言过滤
    if (selectedLanguage !== 'all') {
      result = result.filter((repo) => repo.language === selectedLanguage);
    }

    // 排序
    switch (sortBy) {
      case 'stars':
        result.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'forks':
        result.sort((a, b) => b.forks_count - a.forks_count);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updated':
      default:
        result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    return result;
  }, [repos, searchQuery, sortBy, selectedLanguage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">所有仓库</h1>
        <p className="text-slate-500 dark:text-slate-400">
          共 {repos.length} 个公开仓库
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="搜索仓库..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">所有语言</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="updated">最近更新</option>
            <option value="stars">Star 数</option>
            <option value="forks">Fork 数</option>
            <option value="name">名称</option>
          </select>
        </div>
      </div>

      {/* Sort indicators */}
      <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <ArrowUpDown className="w-4 h-4" />
          排序: {sortBy === 'updated' ? '最近更新' : sortBy === 'stars' ? 'Star 数' : sortBy === 'forks' ? 'Fork 数' : '名称'}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          总 Star: {repos.reduce((sum, r) => sum + r.stargazers_count, 0)}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          总 Fork: {repos.reduce((sum, r) => sum + r.forks_count, 0)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          显示: {filteredAndSortedRepos.length}/{repos.length}
        </span>
      </div>

      {/* Repo Grid */}
      {filteredAndSortedRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400">没有找到匹配的仓库</p>
        </div>
      )}
    </div>
  );
}
