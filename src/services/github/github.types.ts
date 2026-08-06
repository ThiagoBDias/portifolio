export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  size: number;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubProfileResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string | null;
  profileUrl: string;
  publicRepos: number | null;
}

export interface Language {
  name: string;
  bytes: number;
  repositories: number;
}

export interface Technology {
  name: string;
  icon: string;
  color: string;
  category: 'frontend' | 'backend' | 'devops' | 'other';
  percentage: number;
  experience: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  repos: number;
}

export interface Contribution {
  repository: string;
  updatedAt: string;
  stars: number;
  forks: number;
}

export interface GitHubProject {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  demoLink: string | null;
  githubLink: string;
  category: string;
  featured: boolean;
  status: 'published';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
}

export interface TechnologyData {
  techsByCategory: Record<'frontend' | 'backend' | 'devops', Technology[]>;
  metadata: {
    source: 'github_api_realtime' | 'fallback';
    lastUpdated: string;
    totalTechs: number;
  };
}

export interface GitHubPortfolioData {
  profile: GitHubProfile;
  projects: GitHubProject[];
  technologies: TechnologyData;
}

export interface CachedGitHubData {
  savedAt: string;
  data: GitHubPortfolioData;
}
