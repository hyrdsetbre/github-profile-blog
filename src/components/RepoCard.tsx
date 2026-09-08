import { Star, GitFork, ExternalLink, Circle } from 'lucide-react';
import type { GitHubRepo } from '../types/github';
import { formatDate, getLanguageColor } from '../services/githubApi';

interface RepoCardProps {
  repo: GitHubRepo;
  featured?: boolean;
}

export default function RepoCard({ repo, featured = false }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 ${
        featured ? 'ring-1 ring-indigo-200 dark:ring-indigo-800' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
          {repo.name}
          {repo.fork && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              Fork
            </span>
          )}
        </h3>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100" />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || '暂无描述'}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-4">
          {repo.language && (
            <span className="flex items-center gap-1">
              <Circle
                className="w-3 h-3 fill-current"
                style={{ color: getLanguageColor(repo.language) }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />
            {repo.forks_count}
          </span>
        </div>
        <span className="hidden sm:inline">
          更新于 {formatDate(repo.updated_at)}
        </span>
      </div>
    </a>
  );
}
