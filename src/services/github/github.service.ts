import { PORTFOLIO_CONFIG } from '../../lib/portfolio-config.js';
import { getAllPublishedProjectsMock } from '../../lib/projects-data.js';
import { readGitHubCache, writeGitHubCache } from './github.cache';
import { GITHUB_API_BASE_URL, GITHUB_REPOSITORIES_LIMIT, TECHNOLOGY_DETAILS } from './github.constants';
import type { GitHubPortfolioData, GitHubProfile, GitHubProfileResponse, GitHubProject, Repository, Technology, TechnologyData } from './github.types';

let portfolioDataPromise: Promise<GitHubPortfolioData> | undefined;

const fallbackTechnologies: TechnologyData = {
  techsByCategory: {
    frontend: [{ name: 'JavaScript', icon: 'JS', percentage: 95, color: '#f7df1e', category: 'frontend', experience: 'expert', repos: 12 }, { name: 'TypeScript', icon: 'TS', percentage: 88, color: '#3178c6', category: 'frontend', experience: 'advanced', repos: 8 }],
    backend: [{ name: 'Node.js', icon: 'N', percentage: 86, color: '#339933', category: 'backend', experience: 'advanced', repos: 7 }, { name: 'SQL', icon: 'SQL', percentage: 84, color: '#336791', category: 'backend', experience: 'advanced', repos: 6 }],
    devops: [{ name: 'GitHub', icon: 'GH', percentage: 92, color: '#6e7681', category: 'devops', experience: 'expert', repos: 14 }, { name: 'Docker', icon: 'D', percentage: 70, color: '#2496ed', category: 'devops', experience: 'intermediate', repos: 2 }]
  },
  metadata: { source: 'fallback', lastUpdated: new Date().toISOString(), totalTechs: 6 }
};

function log(message: string): void {
  console.info(`[GitHub] ${message}`);
}

function getHeaders(): HeadersInit {
  const token = import.meta.env.GITHUB_TOKEN;
  return { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-site', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

function filterRepositories(repositories: Repository[]): Repository[] {
  return repositories.filter((repository) => !repository.fork && !repository.archived && !repository.private && repository.size > 0 && Boolean(repository.description) && !repository.name.includes('.github') && !PORTFOLIO_CONFIG.github.excludeRepos.some((name: string) => repository.name.toLowerCase().includes(name.toLowerCase())));
}

function categoryFor(repository: Repository): string {
  const language = repository.language ?? '';
  const topics = repository.topics.map((topic) => topic.toLowerCase());
  if (['Python', 'Java', 'C#', 'PHP', 'Go', 'Rust'].includes(language) || topics.some((topic) => ['backend', 'api', 'server'].includes(topic))) return 'Backend';
  if (['Swift', 'Kotlin', 'Dart'].includes(language) || topics.some((topic) => ['mobile', 'android', 'ios'].includes(topic))) return 'Mobile';
  if (topics.some((topic) => ['fullstack', 'full-stack'].includes(topic))) return 'Full Stack';
  return 'Frontend';
}

function projectFrom(repository: Repository): GitHubProject {
  const technologies = [...new Set([repository.language, ...repository.topics.map((topic) => PORTFOLIO_CONFIG.techMapping[topic]?.name ?? topic)].filter(Boolean))].slice(0, PORTFOLIO_CONFIG.display.maxTechnologies) as string[];
  const featured = repository.stargazers_count > 0 || repository.forks_count > 0 || PORTFOLIO_CONFIG.github.featuredKeywords.some((keyword: string) => `${repository.name} ${repository.description}`.toLowerCase().includes(keyword.toLowerCase()));
  return { id: String(repository.id), title: repository.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), description: repository.description!.slice(0, PORTFOLIO_CONFIG.display.maxDescriptionLength), image: null, technologies, demoLink: repository.homepage, githubLink: repository.html_url, category: categoryFor(repository), featured, status: 'published', publishedAt: repository.created_at, createdAt: repository.created_at, updatedAt: repository.updated_at, stars: repository.stargazers_count, forks: repository.forks_count, language: repository.language, topics: repository.topics };
}

function technologiesFrom(repositories: Repository[]): TechnologyData {
  const stats = new Map<string, number>();
  repositories.forEach((repository) => { if (repository.language) stats.set(repository.language, (stats.get(repository.language) ?? 0) + 1); });
  const total = repositories.length || 1;
  const groups: TechnologyData['techsByCategory'] = { frontend: [], backend: [], devops: [] };
  [...stats.entries()].forEach(([language, repos]) => {
    const detail = TECHNOLOGY_DETAILS[language] ?? { name: language, icon: '•', color: '#6b7280', category: 'frontend' as const };
    const technology: Technology = { ...detail, percentage: Math.round((repos / total) * 1000) / 10, experience: repos >= 5 ? 'advanced' : repos >= 2 ? 'intermediate' : 'beginner', repos };
    if (technology.category in groups) groups[technology.category as keyof typeof groups].push(technology);
  });
  Object.values(groups).forEach((items) => items.sort((a, b) => b.percentage - a.percentage));
  return { techsByCategory: groups, metadata: { source: 'github_api_realtime', lastUpdated: new Date().toISOString(), totalTechs: stats.size } };
}

function profileFrom(profile: GitHubProfileResponse): GitHubProfile {
  return {
    login: profile.login,
    name: profile.name,
    avatarUrl: profile.avatar_url,
    profileUrl: profile.html_url,
    publicRepos: profile.public_repos
  };
}

function fallbackProfile(username: string): GitHubProfile {
  return {
    login: username,
    name: null,
    avatarUrl: null,
    profileUrl: `https://github.com/${username}`,
    publicRepos: null
  };
}

async function fetchPortfolioData(): Promise<GitHubPortfolioData> {
  const cached = await readGitHubCache();
  if (cached) { log('Dados carregados do cache'); return cached; }
  const username = import.meta.env.GITHUB_USERNAME || PORTFOLIO_CONFIG.github.username;
  try {
    const [profileResponse, repositoriesResponse] = await Promise.all([
      fetch(`${GITHUB_API_BASE_URL}/users/${username}`, { headers: getHeaders() }),
      fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=${GITHUB_REPOSITORIES_LIMIT}`, { headers: getHeaders() })
    ]);
    if (!profileResponse.ok || !repositoriesResponse.ok) throw new Error(`HTTP ${profileResponse.status}/${repositoriesResponse.status}`);
    log('GitHub conectado');
    const [profile, repositoryResponse] = await Promise.all([
      profileResponse.json() as Promise<GitHubProfileResponse>,
      repositoriesResponse.json() as Promise<Repository[]>
    ]);
    const repositories = filterRepositories(repositoryResponse);
    const data = { profile: profileFrom(profile), projects: repositories.map(projectFrom), technologies: technologiesFrom(repositories) };
    await writeGitHubCache(data);
    return data;
  } catch {
    log('Utilizando fallback');
    return { profile: fallbackProfile(username), projects: getAllPublishedProjectsMock() as GitHubProject[], technologies: fallbackTechnologies };
  }
}

export function getGitHubPortfolioData(): Promise<GitHubPortfolioData> {
  portfolioDataPromise ??= fetchPortfolioData();
  return portfolioDataPromise;
}

export async function getAllGitHubProjects(): Promise<GitHubProject[]> { return (await getGitHubPortfolioData()).projects; }
export async function getFeaturedGitHubProjects(limit = 3): Promise<GitHubProject[]> { return (await getGitHubPortfolioData()).projects.filter((project) => project.featured).slice(0, limit); }
export async function getGitHubTechnologies(): Promise<TechnologyData> { return (await getGitHubPortfolioData()).technologies; }
