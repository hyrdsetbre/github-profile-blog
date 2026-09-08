import type { GitHubUser, GitHubRepo, GitHubEvent } from '../types/github';

const GITHUB_USERNAME = 'hyrdsetbre';
const BASE_URL = 'https://api.github.com';

// 可选：使用 Token 提高请求限制（60/h → 5000/h）
const GITHUB_TOKEN = ''; // 不硬编码 token，保持公开访问

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
};

if (GITHUB_TOKEN) {
  headers.Authorization = `token ${GITHUB_TOKEN}`;
}

export async function fetchUser(): Promise<GitHubUser> {
  const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
}

export async function fetchRepos(
  sort: 'updated' | 'created' | 'pushed' | 'full_name' = 'updated',
  perPage = 100
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${perPage}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.status}`);
  }
  return response.json();
}

export async function fetchEvents(perPage = 10): Promise<GitHubEvent[]> {
  const response = await fetch(
    `${BASE_URL}/users/${GITHUB_USERNAME}/events/public?per_page=${perPage}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }
  return response.json();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#41b883',
    React: '#61dafb',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    Shell: '#89e051',
    Dockerfile: '#384d54',
  };
  return colors[language || ''] || '#8b949e';
}
